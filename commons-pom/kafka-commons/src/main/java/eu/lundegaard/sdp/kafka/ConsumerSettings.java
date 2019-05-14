package eu.lundegaard.sdp.kafka;

public interface ConsumerSettings {
    String getKeyDeserializer();

    String getValueDeserializer();

    int getAutoCommitIntervalMs();

    int getRequestTimeoutMs();

    boolean isEnableAutoCommit();
}
