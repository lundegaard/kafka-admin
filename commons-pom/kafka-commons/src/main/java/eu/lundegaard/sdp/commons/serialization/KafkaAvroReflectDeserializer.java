package eu.lundegaard.sdp.commons.serialization;

import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.rest.exceptions.RestClientException;
import org.apache.avro.Schema;
import org.apache.avro.io.DatumReader;
import org.apache.avro.reflect.ReflectData;
import org.apache.avro.reflect.ReflectDatumReader;

import java.io.IOException;

public class KafkaAvroReflectDeserializer extends AbstractAvroDeserializer {
    private static final ReflectData REFLECT_DATA = ReflectData.AllowNull.get();
    private Schema readerSchema;

    public KafkaAvroReflectDeserializer() {
        this(null, null);
    }

    public KafkaAvroReflectDeserializer(Schema readerSchema) {
        this(readerSchema, null);
    }

    public KafkaAvroReflectDeserializer(Schema readerSchema, SchemaRegistryClient schemaRegistry) {
        super(schemaRegistry);
        this.readerSchema = readerSchema;
    }

    @Override
    protected DatumReader<Object> getReader(int schemaId) throws IOException, RestClientException {
        Schema writer = schemaRegistry.getById(schemaId);

        Schema reader = readerSchema == null ? writer : readerSchema;
        return new ReflectDatumReader<>(writer, reader, REFLECT_DATA);
    }
}
