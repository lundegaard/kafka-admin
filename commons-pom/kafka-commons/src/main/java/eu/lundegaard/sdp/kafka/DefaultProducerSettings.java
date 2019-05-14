package eu.lundegaard.sdp.kafka;

import lombok.Data;

@Data
public class DefaultProducerSettings implements ProducerSettings {
    private String acks;
    private String retries;
    private String batchSize;
    private String lingerMs;
    private String bufferMemory;
    private String keySerializer;
    private String valueSerializer;
}
