package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

import java.util.List;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class PartitionDetails {

    private int partition;

    private int leader;

    private long beginningOffset;

    private long endOffset;

    private List<Replica> replicas;

}
