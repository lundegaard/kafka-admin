package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class Topic {

    private String name;

    private int partitions;

    private short replicationFactor;
}
