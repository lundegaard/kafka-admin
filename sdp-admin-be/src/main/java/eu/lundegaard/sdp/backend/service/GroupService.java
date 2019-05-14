package eu.lundegaard.sdp.backend.service;



import eu.lundegaard.sdp.backend.dto.ConsumerOffsetDto;
import eu.lundegaard.sdp.backend.dto.DetailGroupSummaryDto;
import eu.lundegaard.sdp.backend.dto.GroupOverviewDto;
import eu.lundegaard.sdp.backend.dto.GroupSummaryDto;

import java.util.List;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
public interface GroupService {
    GroupSummaryDto describeConsumerGroup(String groupId);

    List<GroupOverviewDto> listConsumerGroupsFlattened();

    List<GroupOverviewDto> listAllGroupsFlattened();

    List<ConsumerOffsetDto> getConsumerOffset(String groupId);

    List<DetailGroupSummaryDto> listConsumerGroupsDetailed();

    List<DetailGroupSummaryDto> listStreamProcessorsDetailed();
}
