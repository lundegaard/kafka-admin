package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class MessagesRequest {

    private String topic;

    private int partition;

    private int offset;

    private int number;

}
