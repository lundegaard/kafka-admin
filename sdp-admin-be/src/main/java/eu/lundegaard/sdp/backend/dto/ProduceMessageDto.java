package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class ProduceMessageDto {

    @NotNull
    private String topic;

    private String key;

    @NotNull
    private String value;
}
