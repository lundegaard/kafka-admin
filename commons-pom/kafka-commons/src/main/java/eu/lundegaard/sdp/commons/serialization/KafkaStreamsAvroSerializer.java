package eu.lundegaard.sdp.commons.serialization;

import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import org.apache.kafka.common.serialization.Serializer;

import java.util.Map;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
public class KafkaStreamsAvroSerializer<T> implements Serializer<T> {

    private final KafkaAvroReflectSerializer serializer;

    public KafkaStreamsAvroSerializer() {
        this.serializer = new KafkaAvroReflectSerializer();
    }

    public KafkaStreamsAvroSerializer(SchemaRegistryClient schemaRegistry) {
        this.serializer = new KafkaAvroReflectSerializer(schemaRegistry);
    }

    @Override
    public void configure(Map<String, ?> map, boolean b) {
        serializer.configure(map, b);
    }

    @Override
    public byte[] serialize(String s, T t) {
        return serializer.serialize(s, t);
    }

    @Override
    public void close() {
        serializer.close();
    }
}