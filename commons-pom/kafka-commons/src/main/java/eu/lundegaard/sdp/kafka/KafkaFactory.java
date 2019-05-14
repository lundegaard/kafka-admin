package eu.lundegaard.sdp.kafka;

import io.confluent.kafka.serializers.KafkaAvroDeserializerConfig;
import io.confluent.kafka.serializers.KafkaAvroSerializerConfig;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.KafkaException;
import org.apache.kafka.common.serialization.Deserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Objects;
import java.util.Properties;

/**
 * Constructs kafka client/producer/admin based on defined properties.
 */
public class KafkaFactory {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaFactory.class);
    private static final Properties EMPTY_PROPS = new Properties();
    private final KafkaServices services;
    private final ProducerSettings producerProps;
    private final ConsumerSettings consumerProps;
    private final boolean isDefaultProducerKeySerializerDefined;
    private final boolean isDefaultProducerValueSerializerDefined;
    private final boolean isDefaultConsumerKeyDeserializerDefined;
    private final boolean isDefaultConsumerValueDeserializerDefined;

    public KafkaFactory(KafkaServices service) {
        this(service, new DefaultProducerSettings(), new DefaultConsumerSettings());
    }

    public KafkaFactory(KafkaServices service, ProducerSettings settings) {
        this(service, settings, new DefaultConsumerSettings());
    }

    public KafkaFactory(KafkaServices service, ConsumerSettings settings) {
        this(service, new DefaultProducerSettings(), settings);
    }

    public KafkaFactory(KafkaServices services, ProducerSettings producerProps, ConsumerSettings consumerProps) {
        this.services = services;
        this.producerProps = producerProps;
        this.consumerProps = consumerProps;
        this.isDefaultProducerKeySerializerDefined = validateCorrectClass(producerProps.getKeySerializer());
        this.isDefaultProducerValueSerializerDefined = validateCorrectClass(producerProps.getValueSerializer());
        this.isDefaultConsumerKeyDeserializerDefined = validateCorrectClass(consumerProps.getKeyDeserializer());
        this.isDefaultConsumerValueDeserializerDefined = validateCorrectClass(consumerProps.getValueDeserializer());
    }

    /**
     * @throws IllegalArgumentException in case when default producer properties does not have defined serializers
     * @throws KafkaException when required property defined by kafka producer is not defined
     * @return kafka producer created from default producer properties
     */
    public <K, V> KafkaProducer<K, V> newProducer() {
        Validate.isTrue(isDefaultProducerKeySerializerDefined, "Key serializer is not defined");
        Validate.isTrue(isDefaultProducerValueSerializerDefined, "Value serializer is not defined");
        return newProducer(EMPTY_PROPS);
    }

    /**
     * @param overrideProperties which allows default configuration override
     * @throws KafkaException when required property defined by kafka producer is not defined
     * @return kafka producer created from default producer properties
     */
    public <K, V> KafkaProducer<K, V> newProducer(Properties overrideProperties) {

        HashMap<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, services.getKafkaAddress());
        props.put(ProducerConfig.ACKS_CONFIG, producerProps.getAcks());
        props.put(ProducerConfig.RETRIES_CONFIG, producerProps.getRetries());
        props.put(ProducerConfig.BATCH_SIZE_CONFIG, producerProps.getBatchSize());
        props.put(ProducerConfig.LINGER_MS_CONFIG, producerProps.getLingerMs());
        props.put(ProducerConfig.BUFFER_MEMORY_CONFIG, producerProps.getBufferMemory());
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, producerProps.getKeySerializer());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, producerProps.getValueSerializer());
        props.put(KafkaAvroSerializerConfig.SCHEMA_REGISTRY_URL_CONFIG, services.getSchemaRegistryUrl());
        //Remove entries which are null since properties does not allow them
        props.values().removeIf(Objects::isNull);

        Properties configuration = new Properties();
        configuration.putAll(props);
        configuration.putAll(overrideProperties);

        return new KafkaProducer<>(configuration);
    }

    /**
     * @param groupId
     * @throws IllegalArgumentException in case when default consumer properties does not have defined deserializers
     * @throws KafkaException when required property defined by kafka consumer is not defined
     * @return kafka consumer created for given groupId from default consumer properties
     */
    public <K, V> KafkaConsumer<K, V> newConsumer(String groupId) {
        Validate.isTrue(isDefaultConsumerKeyDeserializerDefined, "Key deserializer is not defined");
        Validate.isTrue(isDefaultConsumerValueDeserializerDefined, "Value deserializer is not defined");
        return newConsumer(groupId, EMPTY_PROPS, null, null);
    }

    public <K, V> KafkaConsumer<K, V> newConsumer(String groupId, Properties overrideProperties) {
        return newConsumer(groupId, overrideProperties, null, null);
    }

    /**
     * @param groupId
     * @param overrideProperties
     * @param keyDeserializer
     * @param valueDeserializer
     * @throws KafkaException when required property defined by kafka consumer is not defined
     * @return kafka consumer created for given groupId from default consumer properties
     */
    public <K, V> KafkaConsumer<K, V> newConsumer(String groupId, Properties overrideProperties, Deserializer<K> keyDeserializer, Deserializer<V> valueDeserializer) {
        Validate.notNull(groupId, "Group id could not be null");
        HashMap<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, services.getKafkaAddress());
        props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, consumerProps.isEnableAutoCommit());
        props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, consumerProps.getAutoCommitIntervalMs());
        props.put(ConsumerConfig.REQUEST_TIMEOUT_MS_CONFIG, consumerProps.getRequestTimeoutMs());
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, consumerProps.getKeyDeserializer());
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, consumerProps.getValueDeserializer());
        props.put(KafkaAvroDeserializerConfig.SCHEMA_REGISTRY_URL_CONFIG, services.getSchemaRegistryUrl());
        //Remove entries which are null since properties does not allow them
        props.values().removeIf(Objects::isNull);

        Properties configuration = new Properties();
        configuration.putAll(props);
        configuration.putAll(overrideProperties);

        return new KafkaConsumer<>(configuration, keyDeserializer, valueDeserializer);
    }

    /**
     * @return admin client created from default consumer properties
     */
    public AdminClient newAdminClient() {
        Properties config = new Properties();
        config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, services.getKafkaAddress());
        return AdminClient.create(config);
    }

    private boolean validateCorrectClass(String className) {
        try {
            if (StringUtils.isNotBlank(className)) {
                LOGGER.trace("Checking for (de)serializer {}", className);
                Class.forName(className);
                return true;
            } else {
                LOGGER.trace("No (de)serializer defined, skipping");
                return false;
            }
        } catch (ClassNotFoundException ex) {
            throw new IllegalArgumentException("Failed to load (de)serializers class definition, please check your configuration or dependencies");
        }
    }
}
