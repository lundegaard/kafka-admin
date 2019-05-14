package eu.lundegaard.sdp.backend.component.impl;

import eu.lundegaard.sdp.backend.component.ConsumerApi;
import eu.lundegaard.sdp.backend.config.ConsumerProperties;
import eu.lundegaard.sdp.backend.dto.MessageDto;
import eu.lundegaard.sdp.kafka.KafkaFactory;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.PartitionInfo;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.*;
import java.util.function.Function;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Component
@RequiredArgsConstructor
public class ConsumerApiImpl implements ConsumerApi {

    private static final Logger LOG = LoggerFactory.getLogger(ConsumerApiImpl.class);

    private final ConsumerProperties consumerProperties;

    private final KafkaFactory factory;

    private KafkaConsumer<String, Object> kafkaConsumer;

    @PostConstruct
    private void init() {
        LOG.info("Creating KafkaConsumer.");
        this.kafkaConsumer = factory.newConsumer(consumerProperties.getGroupId());
    }

    @PreDestroy
    private void destroy() {
        LOG.info("Closing KafkaConsumer.");
        this.kafkaConsumer.close();
    }

    @Override
    public Map<String, List<PartitionInfo>> listTopics() {
        return this.callKafkaConsumer(KafkaConsumer::listTopics);
    }

    @Override
    public Map<TopicPartition, Long> beginningOffsets(Set<TopicPartition> partitions) {
        return this.callKafkaConsumer(kafkaConsumer -> kafkaConsumer.beginningOffsets(partitions));
    }

    @Override
    public Map<TopicPartition, Long> endOffsets(Set<TopicPartition> partitions) {
        return this.callKafkaConsumer(kafkaConsumer -> kafkaConsumer.endOffsets(partitions));
    }

    private List<ConsumerRecord<String, Object>> readPartitionMessages(Set<TopicPartition> topicPartitions, int offset, int messageCount, Properties overrideProperties) throws RuntimeException {
        KafkaConsumer<String, Object> messagesConsumer = factory.newConsumer(
                consumerProperties.getGroupId(), overrideProperties);
        messagesConsumer.assign(topicPartitions);
        messagesConsumer.endOffsets(topicPartitions).forEach((k, v) -> {
            messagesConsumer.seek(k, offset);
        });
        List<ConsumerRecord<String, Object>> records = new ArrayList<>();

        messagesConsumer.poll(consumerProperties.getPollTimeout()).forEach(records::add);
        if (records.size() < messageCount) {
            messagesConsumer.poll(consumerProperties.getPollTimeout()).forEach(records::add);
        }

        messagesConsumer.close();

        return records;
    }

    @Override
    public List<MessageDto> getPartitionMessages(Set<TopicPartition> topicPartitions, int offset, int messageCount) {
        Properties overrideProperties = new Properties();
        overrideProperties.setProperty(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, Integer.toString(messageCount));

        List<ConsumerRecord<String, Object>> records;
        try {
            records = readPartitionMessages(topicPartitions, offset, messageCount, overrideProperties);
        } catch (RuntimeException e) {
            LOG.warn("Failed to deserialize messages using default deserializer, falling back to string deserializer {}", e);
            overrideProperties.setProperty(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
            records = readPartitionMessages(topicPartitions, offset, messageCount, overrideProperties);
        }

        List<MessageDto> messages = new ArrayList<>();
        for (ConsumerRecord<String, Object> record : records) {
            messages.add(new MessageDto()
                    .setTopic(record.topic())
                    .setPartition(record.partition())
                    .setKey(record.key())
                    .setValue(String.valueOf(record.value()))
                    .setOffset(record.offset())
                    .setTimestamp(record.timestamp())
            );
            if (messages.size() == messageCount) {
                break;
            }
        }
        return messages;
    }

    @Override
    public void recreateKafkaConsumer() {
        this.destroy();
        this.init();
    }

    private <T> T callKafkaConsumer(Function<KafkaConsumer, T> func) {
        LOG.debug("Calling kafka consumer");
        try {
            return func.apply(kafkaConsumer);
        } catch (Exception e) {
            LOG.debug("Reinitializing kafka consumer");
            init();
        }

        try {
            return func.apply(kafkaConsumer);
        } catch (Exception e) {
            LOG.error("Unable to call function on kafka consumer: {}", e);
            throw new RuntimeException("Unable to call function on kafka consumer: " + e);
        }
    }

}
