package eu.lundegaard.sdp.commons.serialization;

import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import org.apache.avro.Schema;
import org.apache.avro.reflect.ReflectData;
import org.apache.kafka.common.serialization.Deserializer;

import java.util.Map;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
public class KafkaStreamsAvroDeserializer<T> implements Deserializer<T> {

    private static final ReflectData REFLECT_DATA = ReflectData.AllowNull.get();

    private KafkaAvroReflectDeserializer deserializer;

    public KafkaStreamsAvroDeserializer(Class<?> type) {
        this(type, null);
    }

    public KafkaStreamsAvroDeserializer(Class<?> type, SchemaRegistryClient schemaRegistry) {
        Schema schema = REFLECT_DATA.getSchema(type);
        this.deserializer = new KafkaAvroReflectDeserializer(schema, schemaRegistry);
    }

    @Override
    public void configure(Map<String, ?> map, boolean b) {
        deserializer.configure(map, b);
    }

    @Override
    @SuppressWarnings("unchecked")
    public T deserialize(String s, byte[] bytes) {
        return (T) deserializer.deserialize(s, bytes);
    }

    @Override
    public void close() {
        deserializer.close();
    }
}