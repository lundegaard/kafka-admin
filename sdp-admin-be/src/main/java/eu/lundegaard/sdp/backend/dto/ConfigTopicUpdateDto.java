package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class ConfigTopicUpdateDto {

    private String topic;

    private String name;

    private String value;
}
