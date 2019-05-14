package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

import java.util.List;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@Data
public class ConsumerDto {

    private String clientId;

    private String consumerId;

    private List<TopicPartitionDto> assignment;

    private String host;
}
