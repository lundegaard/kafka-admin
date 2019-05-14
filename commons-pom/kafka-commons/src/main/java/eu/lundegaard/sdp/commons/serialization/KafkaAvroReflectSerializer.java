package eu.lundegaard.sdp.commons.serialization;

import eu.lundegaard.sdp.commons.io.Strings;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.rest.exceptions.RestClientException;
import io.confluent.kafka.serializers.KafkaAvroSerializer;
import org.apache.avro.Schema;
import org.apache.avro.io.DatumWriter;
import org.apache.avro.io.Encoder;
import org.apache.avro.io.EncoderFactory;
import org.apache.avro.reflect.ReflectData;
import org.apache.avro.reflect.ReflectDatumWriter;
import org.apache.kafka.common.errors.SerializationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;

public class KafkaAvroReflectSerializer extends KafkaAvroSerializer {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaAvroReflectSerializer.class);
    private static final EncoderFactory ENCODER_FACTORY = EncoderFactory.get();
    private static final ReflectData REFLECT_DATA = ReflectData.AllowNull.get();

    public KafkaAvroReflectSerializer() {
    }

    public KafkaAvroReflectSerializer(SchemaRegistryClient schemaRegistry) {
        super(schemaRegistry);
    }

    @Override
    protected byte[] serializeImpl(String subject, Object value) throws SerializationException {
        Schema schema = null;
        if (value == null) {
            return null;
        }
        try {
            schema = REFLECT_DATA.getSchema(value.getClass());
            int registeredSchemaId = this.schemaRegistry.register(subject, schema);
            LOGGER.trace("Instance serialized to topic {} with schema id {}", subject, registeredSchemaId);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            out.write(0);
            out.write(ByteBuffer.allocate(4).putInt(registeredSchemaId).array());

            DatumWriter<Object> dw = new ReflectDatumWriter<>(schema);
            Encoder encoder = ENCODER_FACTORY.directBinaryEncoder(out, null);
            dw.write(value, encoder);
            encoder.flush();
            return out.toByteArray();
        } catch (RuntimeException | IOException e) {
            throw new SerializationException(Strings.format("Error serializing Avro message for subject: {}", subject),  e);
        } catch (RestClientException e) {
            throw new SerializationException(Strings.format("Error registering Avro schema: {}", schema), e);
        }
    }
}
