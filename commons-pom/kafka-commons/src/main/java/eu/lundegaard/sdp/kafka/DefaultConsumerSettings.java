package eu.lundegaard.sdp.kafka;

import lombok.Data;

@Data
public class DefaultConsumerSettings implements ConsumerSettings {
    private String keyDeserializer;
    private String valueDeserializer;
    private int autoCommitIntervalMs;
    private int requestTimeoutMs;
    private boolean enableAutoCommit;
}
