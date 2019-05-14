package eu.lundegaard.sdp.commons.serialization;

import io.confluent.kafka.schemaregistry.client.CachedSchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.avro.Schema;
import org.apache.avro.reflect.ReflectData;
import org.junit.Ignore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class KafkaAvroReflectSerializerSandboxTest {

    private static final Logger LOG = LoggerFactory.getLogger(KafkaAvroReflectSerializerSandboxTest.class);

    @Ignore
    public void serializeAndTest() {
        SchemaRegistryClient schemaRegistry = new CachedSchemaRegistryClient("http://localhost:8082", 10);
        KafkaAvroReflectSerializer serializer = new KafkaAvroReflectSerializer(schemaRegistry);
        serializer.serialize("foo", new Foo("a", "b"));
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class Foo {
        private String a;
        private String b;
    }


    @Ignore
    public static void getSchemaTest() {
        final ReflectData reflect = ReflectData.AllowNull.get();
        Schema schema = reflect.getSchema(Foo.class);
        LOG.error("Schema: {}", schema);
    }
}