package eu.lundegaard.sdp.backend.component;

import eu.lundegaard.sdp.backend.dto.ConsumerOffsetDto;
import eu.lundegaard.sdp.backend.dto.GroupOverviewDto;
import eu.lundegaard.sdp.backend.dto.GroupSummaryDto;
import kafka.admin.AdminClient;
import kafka.coordinator.group.GroupOverview;

import java.util.List;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
public interface GroupAdminApi {
    List<ConsumerOffsetDto> getConsumerOffset(String groupId);

    List<GroupOverviewDto> listConsumerGroupsFlattened();

    List<GroupOverviewDto> listAllGroupsFlattened();

    GroupSummaryDto describeConsumerGroup(String groupId);
}
