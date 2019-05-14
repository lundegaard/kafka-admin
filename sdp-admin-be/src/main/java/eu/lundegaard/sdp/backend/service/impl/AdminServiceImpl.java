package eu.lundegaard.sdp.backend.service.impl;

import eu.lundegaard.sdp.backend.component.AdminApi;
import eu.lundegaard.sdp.backend.dto.BrokersDto;
import eu.lundegaard.sdp.backend.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Service
public class AdminServiceImpl implements AdminService {
    private static final Logger LOG = LoggerFactory.getLogger(AdminService.class);
    private final AdminApi adminApi;

    public AdminServiceImpl(AdminApi adminApi) {
        this.adminApi = adminApi;
    }

    @Override
    public List<Integer> listBrokers() {
        return adminApi.listBrokers();
    }

    @Override
    public List<BrokersDto> listBrokersConfigs() {
        return adminApi.listBrokersConfigs();
    }

}
