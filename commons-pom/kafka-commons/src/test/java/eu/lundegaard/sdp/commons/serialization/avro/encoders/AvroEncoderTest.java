package eu.lundegaard.sdp.commons.serialization.avro.encoders;

import com.fasterxml.jackson.databind.node.ObjectNode;
import eu.lundegaard.commons.collections.Maps;
import eu.lundegaard.sdp.commons.serialization.JsonUtil;
import eu.lundegaard.sdp.commons.serialization.KafkaAvroReflectDeserializer;
import eu.lundegaard.sdp.commons.serialization.KafkaAvroReflectSerializer;
import io.confluent.kafka.schemaregistry.client.MockSchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.rest.exceptions.RestClientException;
import org.apache.avro.Schema;
import org.apache.avro.reflect.ReflectData;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class AvroEncoderTest {
    private static final Logger LOGGER = LoggerFactory.getLogger(AvroEncoderTest.class);
    private static final ReflectData REFLECT_DATA = ReflectData.AllowNull.get();
    private static final String TOPIC = "topic";
    private static final String JSON = "{\"a\":\"a\"}";

    @Test
    public void checkSchema() {
        Schema schema = REFLECT_DATA.getSchema(Dummy.class);
        Schema keysSchema = schema.getField("keys").schema();
        assertEquals(Schema.Type.UNION, keysSchema.getType());
        assertTrue(keysSchema.getTypes().stream().map(Schema::getType).anyMatch(Schema.Type.STRING::equals));
        Schema jsonSchema = schema.getField("json").schema();
        assertEquals(Schema.Type.UNION, jsonSchema.getType());
        assertTrue(jsonSchema.getTypes().stream().map(Schema::getType).anyMatch(Schema.Type.STRING::equals));
    }

    @Test
    public void serializeAndRetrieve() throws IOException, RestClientException {
        Schema schema = REFLECT_DATA.getSchema(Dummy.class);
        ObjectNode json = JsonUtil.fromJson(JSON, ObjectNode.class);
        Dummy instance = new Dummy("A", Maps.of("1", 1).put("2", 2).build(), json);
        MockSchemaRegistryClient mockSchemaRegistry = new MockSchemaRegistryClient();
        mockSchemaRegistry.register(TOPIC, schema);
        KafkaAvroReflectSerializer serializer = new KafkaAvroReflectSerializer(mockSchemaRegistry);

        byte[] instanceAsBytes = serializer.serialize(TOPIC, instance);
        KafkaAvroReflectDeserializer deserializer = new KafkaAvroReflectDeserializer(schema, mockSchemaRegistry);
        Dummy dummy = (Dummy) deserializer.deserialize(TOPIC, instanceAsBytes);

        assertEquals(JSON, JsonUtil.toJson(dummy.getJson()));
        List<String> expectedKeys = instance.getKeys().keySet().stream().sorted().collect(Collectors.toList());
        List<String> keys = dummy.getKeys().keySet().stream().sorted().collect(Collectors.toList());
        assertEquals(expectedKeys, keys);
    }

}