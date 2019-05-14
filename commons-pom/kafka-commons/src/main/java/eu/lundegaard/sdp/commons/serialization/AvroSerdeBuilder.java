package eu.lundegaard.sdp.commons.serialization;

import io.confluent.kafka.schemaregistry.client.CachedSchemaRegistryClient;
import io.confluent.kafka.schemaregistry.client.SchemaRegistryClient;
import io.confluent.kafka.serializers.AbstractKafkaAvroSerDeConfig;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.serialization.Serializer;

import java.util.Collections;

public class AvroSerdeBuilder implements SerdeBuilder {
    private final SchemaRegistryClient schemaRegistry;
    private final String schemaRegistryUrl;

    public AvroSerdeBuilder(SchemaRegistryClient schemaRegistry) {
        this.schemaRegistry = schemaRegistry;
        this.schemaRegistryUrl = "";
    }

    public AvroSerdeBuilder(String schemaRegistryUrl) {
        this.schemaRegistryUrl = schemaRegistryUrl;
        this.schemaRegistry = new CachedSchemaRegistryClient(schemaRegistryUrl, 100);
    }

    @Override
    public <T> Serde<T> getSerde(Class<T> type, boolean isKeySerde) {
        Serializer<T> serializer = new KafkaStreamsAvroSerializer<>(schemaRegistry);
        serializer.configure(Collections.singletonMap(AbstractKafkaAvroSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistryUrl), isKeySerde);
        Deserializer<T> deserializer = new KafkaStreamsAvroDeserializer<>(type, schemaRegistry);
        deserializer.configure(Collections.singletonMap(AbstractKafkaAvroSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, schemaRegistryUrl), isKeySerde);

        return Serdes.serdeFrom(serializer, deserializer);
    }
}
