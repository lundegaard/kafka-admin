package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class MessageDto {

    private String topic;

    private String key;

    private String value;

    private int partition;

    private long offset;

    private long timestamp;

}
