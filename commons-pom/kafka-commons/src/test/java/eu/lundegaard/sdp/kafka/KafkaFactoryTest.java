package eu.lundegaard.sdp.kafka;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.KafkaException;
import org.apache.kafka.common.serialization.StringSerializer;
import org.junit.Test;

import java.util.Properties;

import static org.junit.Assert.fail;

public class KafkaFactoryTest {
    private KafkaServices VALID_SERVICES = new DefaultKafkaServices("127.0.0.1:9092", "", "127.0.0.1:8081");
    private KafkaServices INVALID_SERVICES = new DefaultKafkaServices(null, "", "127.0.0.1:8081");

    @Test(expected = IllegalArgumentException.class)
    public void validateSerializersOnInit() {
        DefaultProducerSettings producerConfig = new DefaultProducerSettings();
        producerConfig.setKeySerializer(StringSerializer.class.getName());
        producerConfig.setValueSerializer("org.apache.kafka.common.serialization.not.exists.Serializer");
        new KafkaFactory(VALID_SERVICES, producerConfig);
        fail("Expected message failure");
    }

    @Test(expected = IllegalArgumentException.class)
    public void validateSerializerExistence() {
        DefaultProducerSettings producerConfig = new DefaultProducerSettings();
        KafkaFactory factory = new KafkaFactory(VALID_SERVICES);
        factory.newProducer();
    }

    @Test(expected = KafkaException.class)
    public void failedOnRequiredPropertyByKafka() {
        DefaultProducerSettings producerConfig = new DefaultProducerSettings();
        producerConfig.setKeySerializer(StringSerializer.class.getName());
        producerConfig.setValueSerializer(StringSerializer.class.getName());
        KafkaFactory factory = new KafkaFactory(INVALID_SERVICES, producerConfig);
        factory.newProducer();
    }

    @Test
    public void validateOverride() {
        DefaultProducerSettings producerConfig = new DefaultProducerSettings();
        producerConfig.setKeySerializer(StringSerializer.class.getName());
        producerConfig.setValueSerializer(StringSerializer.class.getName());
        KafkaFactory factory = new KafkaFactory(INVALID_SERVICES, producerConfig);
        Properties override = new Properties();
        override.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "127.0.0.1:9093");
        factory.newProducer(override);
    }

}