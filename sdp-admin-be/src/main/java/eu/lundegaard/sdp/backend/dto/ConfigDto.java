package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class ConfigDto {

    private String name;

    private String value;

    private boolean isDefault;

    private boolean isSensitive;

    private boolean isReadOnly;

}
