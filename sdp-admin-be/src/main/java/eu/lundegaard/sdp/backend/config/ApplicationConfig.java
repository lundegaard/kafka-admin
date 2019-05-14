package eu.lundegaard.sdp.backend.config;

import eu.lundegaard.sdp.kafka.KafkaFactory;
import eu.lundegaard.sdp.kafka.KafkaServices;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Configuration
@EnableConfigurationProperties({
        ApplicationProperties.class,
        ConsumerProperties.class,
        ProducerProperties.class,
        ServicesProperties.class
})
@Import({RestConfig.class})
@EnableScheduling
public class ApplicationConfig {
    @Bean
    public KafkaFactory kafkaFactory(KafkaServices services, ProducerProperties producerSettings, ConsumerProperties consumerProperties) {
        return new KafkaFactory(services, producerSettings, consumerProperties);
    }
}
