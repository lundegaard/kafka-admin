package eu.lundegaard.sdp.backend.service.impl;

import eu.lundegaard.sdp.backend.component.GroupAdminApi;
import eu.lundegaard.sdp.backend.dto.*;
import eu.lundegaard.sdp.backend.service.GroupService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@Service
public class GroupServiceImpl implements GroupService {

    private static final Logger LOG = LoggerFactory.getLogger(GroupService.class);

    private static final String STREAM_PROCESSOR_SUFFIX = "_processor";

    @Autowired
    private GroupAdminApi groupAdminApi;

    @Override
    public GroupSummaryDto describeConsumerGroup(String groupId) {
        return groupAdminApi.describeConsumerGroup(groupId);
    }

    @Override
    public List<GroupOverviewDto> listConsumerGroupsFlattened() {
        return groupAdminApi.listConsumerGroupsFlattened();
    }

    @Override
    public List<GroupOverviewDto> listAllGroupsFlattened() {
        return groupAdminApi.listAllGroupsFlattened();
    }

    @Override
    public List<ConsumerOffsetDto> getConsumerOffset(String groupId) {
        return groupAdminApi.getConsumerOffset(groupId);
    }

    @Override
    public List<DetailGroupSummaryDto> listConsumerGroupsDetailed() {
        List<GroupOverviewDto> consumerGroups = listConsumerGroupsFlattened();
        return consumerGroups.stream()
                .map(this::mapToDetailGroupSummaryDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DetailGroupSummaryDto> listStreamProcessorsDetailed() {
        return groupAdminApi.listAllGroupsFlattened()
                .stream()
                .filter(it -> it.getId().endsWith(STREAM_PROCESSOR_SUFFIX))
                .map(this::mapToDetailGroupSummaryDto)
                .collect(Collectors.toList());
    }

    private DetailGroupSummaryDto mapToDetailGroupSummaryDto(GroupOverviewDto groupOverviewDto) {
        GroupSummaryDto groupSummaryDto = describeConsumerGroup(groupOverviewDto.getId());
        return new DetailGroupSummaryDto()
                .setId(groupOverviewDto.getId())
                .setProtocolType(groupOverviewDto.getProtocolType())
                .setState(groupSummaryDto.getState())
                .setConsumers(groupSummaryDto.getConsumers())
                .setAssignmentStrategy(groupSummaryDto.getAssignmentStrategy())
                .setCoordinator(groupSummaryDto.getCoordinator());
    }
}
