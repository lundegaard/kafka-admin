package eu.lundegaard.sdp.kafka;

public interface ProducerSettings {
    String getAcks();

    String getRetries();

    String getBatchSize();

    String getLingerMs();

    String getBufferMemory();

    String getKeySerializer();

    String getValueSerializer();
}
