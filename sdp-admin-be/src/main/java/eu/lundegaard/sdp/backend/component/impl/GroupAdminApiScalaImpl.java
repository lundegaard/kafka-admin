package eu.lundegaard.sdp.backend.component.impl;

import eu.lundegaard.sdp.backend.Constants;
import eu.lundegaard.sdp.backend.component.GroupAdminApi;
import eu.lundegaard.sdp.backend.config.ServicesProperties;
import eu.lundegaard.sdp.backend.dto.*;
import kafka.admin.AdminClient;
import kafka.coordinator.group.GroupOverview;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.common.TopicPartition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import scala.Option;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.function.Function;
import java.util.stream.Collectors;

import static scala.collection.JavaConverters.asJavaCollectionConverter;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@Component
@RequiredArgsConstructor
public class GroupAdminApiScalaImpl implements GroupAdminApi {

    private static final Logger LOG = LoggerFactory.getLogger(GroupAdminApiScalaImpl.class);

    private final ServicesProperties servicesProperties;

    private AdminClient adminClient;

    @PostConstruct
    private void init() {
        LOG.info("Creating Scala kafka AdminClient");
        Properties props = new Properties();
        props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, servicesProperties.getKafkaAddress());
        adminClient = AdminClient.create(props);
    }

    @PreDestroy
    private void destroy() {
        LOG.info("Closing Scala kafka AdminClient");
        if (adminClient != null) {
            adminClient.close();
        }
    }

    private <T> T callAdminClient(Function<AdminClient, T> func) {
        LOG.debug("Calling scala admin");
        try {
            return func.apply(adminClient);
        } catch (Exception e) {
            LOG.debug("Reinitializing scala admin");
            init();
        }

        try {
            return func.apply(adminClient);
        } catch (Exception e) {
            throw new RuntimeException("Unable to connect to kafka bootstrap brokers: " + adminClient.bootstrapBrokers());
        }
    }

    @Override
    public List<ConsumerOffsetDto> getConsumerOffset(String groupId) {
        return asJavaCollectionConverter(callAdminClient(it -> it.listGroupOffsets(groupId)))
                .asJavaCollection()
                .stream()
                .map(it -> new ConsumerOffsetDto()
                            .setTopicPartition(mapToTopicPartitionDto(it._1))
                            .setOffset(it._2))
                .collect(Collectors.toList());
    }

    @Override
    public List<GroupOverviewDto> listConsumerGroupsFlattened() {
        scala.collection.immutable.List<GroupOverview> consumerGroups = callAdminClient(AdminClient::listAllConsumerGroupsFlattened);
        return mapToGroupOverviewDtos(consumerGroups);
    }

    @Override
    public List<GroupOverviewDto> listAllGroupsFlattened() {
        scala.collection.immutable.List<GroupOverview> consumerGroups = callAdminClient(AdminClient::listAllGroupsFlattened);
        return mapToGroupOverviewDtos(consumerGroups);
    }

    @Override
    public GroupSummaryDto describeConsumerGroup(String groupId) {
        return mapToGroupSummaryDto(callAdminClient(it -> it.describeConsumerGroup(groupId, Constants.WAIT_LIMIT_MS)));
    }

    private List<GroupOverviewDto> mapToGroupOverviewDtos(scala.collection.immutable.List<GroupOverview> consumerGroups) {
        return asJavaCollectionConverter(consumerGroups)
                .asJavaCollection()
                .stream()
                .map(this::mapToGroupOverviewDto)
                .collect(Collectors.toList());
    }

    private GroupSummaryDto mapToGroupSummaryDto(AdminClient.ConsumerGroupSummary groupSummary) {
        Option<scala.collection.immutable.List<AdminClient.ConsumerSummary>> consumersOptional = groupSummary.consumers();
        List<ConsumerDto> consumers = Collections.emptyList();
        if (consumersOptional.isDefined()) {
            consumers = asJavaCollectionConverter(consumersOptional.get())
                    .asJavaCollection()
                    .stream()
                    .map(this::mapToConsumerDto)
                    .collect(Collectors.toList());
        }
        return new GroupSummaryDto()
                .setState(groupSummary.state())
                .setAssignmentStrategy(groupSummary.assignmentStrategy())
                .setCoordinator(new NodeDto().setHost(groupSummary.coordinator().host())
                                            .setId(groupSummary.coordinator().idString())
                                            .setPort(groupSummary.coordinator().port())
                                            .setRack(groupSummary.coordinator().rack()))
                .setConsumers(consumers);
    }

    private ConsumerDto mapToConsumerDto(AdminClient.ConsumerSummary consumerSummary) {
        List<TopicPartitionDto> assignment = asJavaCollectionConverter(consumerSummary.assignment())
                .asJavaCollection()
                .stream()
                .map(this::mapToTopicPartitionDto)
                .collect(Collectors.toList());

        return new ConsumerDto()
                .setClientId(consumerSummary.clientId())
                .setConsumerId(consumerSummary.consumerId())
                .setHost(consumerSummary.host())
                .setAssignment(assignment);
    }

    private TopicPartitionDto mapToTopicPartitionDto(TopicPartition topicPartition) {
        return new TopicPartitionDto()
                .setPartition(topicPartition.partition())
                .setTopic(topicPartition.topic());

    }

    private GroupOverviewDto mapToGroupOverviewDto(GroupOverview groupOverview) {
        return new GroupOverviewDto()
                .setId(groupOverview.groupId())
                .setProtocolType(groupOverview.protocolType());
    }
}
