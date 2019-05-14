package eu.lundegaard.sdp.backend.dto;

import lombok.Data;

import java.util.List;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
public class BrokersDto {

    private int id;

    private List<ConfigDto> configs;
}
