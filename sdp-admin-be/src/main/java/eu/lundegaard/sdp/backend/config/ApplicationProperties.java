package eu.lundegaard.sdp.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@ConfigurationProperties("application")
@Data
public class ApplicationProperties {

    private short topicReplication;

    private int topicPartitions;
}
