package eu.lundegaard.sdp.backend.component;

import eu.lundegaard.sdp.backend.dto.MessageDto;
import org.apache.kafka.common.PartitionInfo;
import org.apache.kafka.common.TopicPartition;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
public interface ConsumerApi {

    Map<String, List<PartitionInfo>> listTopics();

    Map<TopicPartition, Long> beginningOffsets(Set<TopicPartition> partitions);

    Map<TopicPartition, Long> endOffsets(Set<TopicPartition> partitions);

    List<MessageDto> getPartitionMessages(Set<TopicPartition> topicPartition, int offset, int number);

    void recreateKafkaConsumer();
}
