package eu.lundegaard.sdp.backend.config;

import eu.lundegaard.sdp.kafka.ConsumerSettings;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@ConfigurationProperties("consumer")
@Data
public class ConsumerProperties implements ConsumerSettings {

    private String groupId;

    private String keyDeserializer;

    private String valueDeserializer;

    private int autoCommitIntervalMs;

    private int requestTimeoutMs;

    private boolean enableAutoCommit;

    /**
     * This is not actual KafkaConsumer property, it is parameter used when calling {@link org.apache.kafka.clients.consumer.KafkaConsumer#poll(long)} method
     */
    private Long pollTimeout;
}
