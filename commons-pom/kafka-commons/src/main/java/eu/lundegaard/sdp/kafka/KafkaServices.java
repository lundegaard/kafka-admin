package eu.lundegaard.sdp.kafka;

/**
 * Parameter interface for providing necessary service addresses for establishing kafka related ecosystem.
 */
public interface KafkaServices {

    String getKafkaAddress();

    String getZookeeperAddress();

    String getSchemaRegistryUrl();
}
