package eu.lundegaard.sdp.backend.service;

import eu.lundegaard.sdp.backend.dto.BrokersDto;

import java.util.List;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
public interface AdminService {

    List<Integer> listBrokers();

    List<BrokersDto> listBrokersConfigs();
}
