package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class TopicDetailsDto {

    private String name;

    private List<ConfigDto> configs;

    private List<PartitionDetails> partitions = new ArrayList<>();

}
