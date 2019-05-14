package eu.lundegaard.sdp.backend.service;

import eu.lundegaard.sdp.backend.dto.*;
import org.apache.kafka.common.TopicPartition;

import java.util.List;
import java.util.Set;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
public interface TopicService {

    void createTopic(String topic, int partitions, short replicationFactor);

    StatusEnum deleteTopic(String topic);

    Set<String> listTopics();

    List<TopicDetailsDto> listTopicsDetails();

    List<MessageDto> getPartitionMessages(TopicPartition topicPartition, int offset, int number);

    ConfigTopicUpdateResult updateTopicConfig(ConfigTopicUpdateDto configTopicUpdateDto);

    StatusEnum sendMessage(MessageDto messageDto);
}
