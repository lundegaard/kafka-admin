package eu.lundegaard.sdp.backend.controller;

import eu.lundegaard.sdp.backend.dto.ConsumerOffsetDto;
import eu.lundegaard.sdp.backend.dto.DetailGroupSummaryDto;
import eu.lundegaard.sdp.backend.dto.GroupOverviewDto;
import eu.lundegaard.sdp.backend.dto.GroupSummaryDto;
import eu.lundegaard.sdp.backend.service.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@RestController
@RequestMapping("/admin/groups")
public class GroupController {

    private static final Logger LOG = LoggerFactory.getLogger(GroupController.class);

    @Autowired
    private GroupService groupService;

    @CrossOrigin
    @GetMapping("/consumerdetails")
    public List<DetailGroupSummaryDto> listAllConsumerGroupsDetailed() {
        LOG.info("Getting all consumer groups detail info");
        return groupService.listConsumerGroupsDetailed();
    }

    @CrossOrigin
    @GetMapping("/consumers")
    public List<GroupOverviewDto> listConsumerGroups() {
        LOG.info("Getting kafka consumer groups");
        return groupService.listConsumerGroupsFlattened();
    }

    @CrossOrigin
    @GetMapping(path = "/processors")
    public List<DetailGroupSummaryDto> listStreamProcessorsDetailed() {
        LOG.info("Getting kafka processor list");
        return groupService.listStreamProcessorsDetailed();
    }

    @CrossOrigin
    @GetMapping("/describe/{groupId}")
    public GroupSummaryDto describeConsumerGroup(@PathVariable("groupId") String groupId) {
        LOG.info("Getting info about consumer group: {}", groupId );
        return groupService.describeConsumerGroup(groupId);
    }

    @CrossOrigin
    @GetMapping({"/all", ""})
    public List<GroupOverviewDto> listAllGroups() {
        LOG.info("Getting kafka groups");
        return groupService.listAllGroupsFlattened();
    }

    @CrossOrigin
    @GetMapping("/offset/{groupId}")
    public List<ConsumerOffsetDto> getConsumerOffset(@PathVariable("groupId") String groupId) {
        LOG.info("Getting consumer offset for group: {}", groupId);
        return groupService.getConsumerOffset(groupId);
    }
}
