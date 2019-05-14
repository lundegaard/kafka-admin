package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@Data
public class ConsumerOffsetDto {

    private TopicPartitionDto topicPartition;

    private Object offset;
}
