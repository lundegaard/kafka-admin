package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

import java.util.List;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
*/
@Data
public class ConfigTopicUpdateResult {

    private StatusEnum statusEnum;

    private List<ConfigDto> configDtoList;

}
