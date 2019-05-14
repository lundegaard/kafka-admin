package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class ConfigIdDto {

    private String name;

    private ConfigTypeEnum type;

    public ConfigIdDto(String name, ConfigTypeEnum type) {
        this.name = name;
        this.type = type;
    }
}
