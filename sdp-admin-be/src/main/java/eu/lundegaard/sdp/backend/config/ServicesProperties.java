package eu.lundegaard.sdp.backend.config;

import eu.lundegaard.sdp.kafka.KafkaServices;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@ConfigurationProperties("services")
@Data
public class ServicesProperties implements KafkaServices {

    private String kafkaAddress;

    private String zookeeperAddress;

    private String schemaRegistryAddress;

    private String schemaRegistryUrl;

    private String kafkaConnectAddress;

}
