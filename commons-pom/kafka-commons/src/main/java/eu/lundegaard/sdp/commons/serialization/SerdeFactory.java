package eu.lundegaard.sdp.commons.serialization;

import io.confluent.kafka.serializers.AbstractKafkaAvroSerDeConfig;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.serialization.Serializer;

import java.util.Collections;


/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
public class SerdeFactory {

    public static String DEFAULT_SCHEMA_REGISTRY_URL = "http://schema-registry:8081";

    private SerdeFactory() {
    }

    public static <T> Serde<T> getJsonSerde(Class<T> clazz) {
        return Serdes.serdeFrom(
                new JsonSerializer<>(),
                new JsonDeserializer<>(clazz)
        );
    }

    public static <T> Serde<T> getAvroSerde(Class<?> type, String schemaRegistryUrl, boolean isKeySerde) {
        Serializer<T> serializer = new KafkaStreamsAvroSerializer<>();
        serializer.configure(
                Collections.singletonMap(AbstractKafkaAvroSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistryUrl), isKeySerde);
        Deserializer<T> deserializer = new KafkaStreamsAvroDeserializer<>(type);
        deserializer.configure(
                Collections.singletonMap(AbstractKafkaAvroSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistryUrl), isKeySerde);

        return Serdes.serdeFrom(serializer, deserializer);
    }

    public static <T> Serde<T> getAvroSerde(Class<?> type) {
        return getAvroSerde(type, DEFAULT_SCHEMA_REGISTRY_URL, false);
    }

    public static <T> Serde<T> getAvroSerde(Class<?> type, boolean isKeySerde) {
        return getAvroSerde(type, DEFAULT_SCHEMA_REGISTRY_URL, isKeySerde);
    }
}
