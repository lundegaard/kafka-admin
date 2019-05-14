package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class Replica {

    private int broker;

    private boolean leader;

    private boolean inSync;
}
