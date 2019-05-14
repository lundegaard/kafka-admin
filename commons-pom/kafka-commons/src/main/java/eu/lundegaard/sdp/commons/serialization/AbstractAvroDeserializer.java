package eu.lundegaard.sdp.commons.serialization;

import eu.lundegaard.sdp.commons.io.Strings;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.rest.exceptions.RestClientException;
import io.confluent.kafka.serializers.KafkaAvroDeserializer;
import org.apache.avro.Schema;
import org.apache.avro.io.BinaryDecoder;
import org.apache.avro.io.DatumReader;
import org.apache.avro.io.DecoderFactory;
import org.apache.kafka.common.errors.SerializationException;

import java.io.IOException;
import java.nio.ByteBuffer;

public abstract class AbstractAvroDeserializer extends KafkaAvroDeserializer {
    private DecoderFactory decoderFactory = DecoderFactory.get();

    public AbstractAvroDeserializer() {
        this(null);
    }

    public AbstractAvroDeserializer(SchemaRegistryClient schemaRegistry) {
        super(schemaRegistry);
    }

    @Override
    protected Object deserialize(boolean includeSchemaAndVersion, String topic, Boolean isKey, byte[] payload, Schema readerSchemaIgnored) throws SerializationException {

        if (payload == null) {
            return null;
        }

        int schemaId = -1;
        try {
            ByteBuffer buffer = ByteBuffer.wrap(payload);
            if (buffer.get() != MAGIC_BYTE) {
                throw new SerializationException("Unknown magic byte!");
            }

            schemaId = buffer.getInt();

            int start = buffer.position() + buffer.arrayOffset();
            int length = buffer.limit() - 1 - idSize;
            DatumReader<Object> datumReader = getReader(schemaId);
            BinaryDecoder decoder = decoderFactory.binaryDecoder(buffer.array(), start, length, null);
            return datumReader.read(null, decoder);
        } catch (IOException e) {
            String msg = Strings.format("Error deserializing Avro message of schema id {} on topic {}", schemaId, topic);
            throw new SerializationException(msg, e);
        } catch (RuntimeException | RestClientException e) {
            String msg = Strings.format("Error retrieving Avro schema id {} on topic {}", schemaId, topic);
            throw new SerializationException(msg, e);
        }
    }

    protected abstract DatumReader<Object> getReader(int schemaId) throws IOException, RestClientException;
}
