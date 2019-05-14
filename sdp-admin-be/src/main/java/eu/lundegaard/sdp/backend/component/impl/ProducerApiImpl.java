package eu.lundegaard.sdp.backend.component.impl;

import eu.lundegaard.sdp.backend.component.ProducerApi;
import eu.lundegaard.sdp.backend.dto.MessageDto;
import eu.lundegaard.sdp.backend.dto.StatusEnum;
import eu.lundegaard.sdp.kafka.KafkaFactory;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Component
@RequiredArgsConstructor
public class ProducerApiImpl implements ProducerApi {

    private static final Logger LOG = LoggerFactory.getLogger(ProducerApiImpl.class);
    private final KafkaFactory factory;
    private Producer<String, String> producer;

    @PostConstruct
    private void init() {
        LOG.info("Creating KafkaProducer.");
        this.producer = factory.newProducer();
    }

    @PreDestroy
    private void destroy() {
        LOG.info("Closing KafkaProducer.");
        this.producer.close();
    }

    public StatusEnum sendMessage(MessageDto messageDto) {
        Future<RecordMetadata> metadataFuture;
        metadataFuture = producer.send(new ProducerRecord<>(
                messageDto.getTopic(),
                messageDto.getKey(),
                messageDto.getValue()));
        try {
            RecordMetadata recordMetadata = metadataFuture.get();
            LOG.debug("Message sent to Kafka (topic={}, offset={}, partition={}, time={}).",
                    recordMetadata.topic(), recordMetadata.offset(), recordMetadata.partition(),
                    recordMetadata.timestamp());
            return StatusEnum.OK;
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            LOG.error("Failed to send message to Kafka.");
            return StatusEnum.BAD_REQUEST;
        }
    }

}
