package eu.lundegaard.sdp.backend.config;

import eu.lundegaard.sdp.kafka.ProducerSettings;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@ConfigurationProperties("producer")
@Data
public class ProducerProperties implements ProducerSettings {

    private String acks;

    private String retries;

    private String batchSize;

    private String lingerMs;

    private String bufferMemory;

    private String keySerializer;

    private String valueSerializer;

}
