package eu.lundegaard.sdp.backend.controller;

import eu.lundegaard.sdp.backend.dto.BrokersDto;
import eu.lundegaard.sdp.backend.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    private static final Logger LOG = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private AdminService adminService;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/brokers")
    public List<Integer> listBrokers() {
        LOG.info("Getting kafka brokers list.");
        return adminService.listBrokers();
    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, path = "/brokers/config")
    public List<BrokersDto> listBrokersConfigs() {
        LOG.info("Getting Broker configuration values.");
        return adminService.listBrokersConfigs();
    }

}
