package eu.lundegaard.sdp.backend.service.impl;

import eu.lundegaard.sdp.backend.component.AdminApi;
import eu.lundegaard.sdp.backend.component.ConsumerApi;
import eu.lundegaard.sdp.backend.component.ProducerApi;
import eu.lundegaard.sdp.backend.config.ApplicationProperties;
import eu.lundegaard.sdp.backend.dto.*;
import eu.lundegaard.sdp.backend.service.TopicService;
import org.apache.kafka.common.PartitionInfo;
import org.apache.kafka.common.TopicPartition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Service
public class TopicServiceImpl implements TopicService {

    private static final Logger LOG = LoggerFactory.getLogger(TopicServiceImpl.class);

    @Autowired
    private AdminApi adminApi;

    @Autowired
    private ConsumerApi consumerApi;

    @Autowired
    private ProducerApi producerApi;

    @Override
    public void createTopic(String topic, int partitions, short replicationFactor) {
        adminApi.createTopics(topic, partitions, replicationFactor);
    }

    @Override
    public StatusEnum deleteTopic(String topic) {
        StatusEnum statusEnum = adminApi.deleteTopic(topic);
        if (statusEnum == StatusEnum.OK) {
            consumerApi.recreateKafkaConsumer();
        }
        return statusEnum;
    }

    @Override
    public Set<String> listTopics() {
        return adminApi.listTopics();
    }

    @Override
    public List<TopicDetailsDto> listTopicsDetails() {
        Map<String, List<PartitionInfo>> nonInternalTopics = consumerApi.listTopics()
                .entrySet()
                .stream()
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        TreeMap<String, List<PartitionInfo>> topicsList = new TreeMap<>(nonInternalTopics);
        Set<TopicPartition> allPartitions = allPartitionsInTopics(topicsList);

        Map<TopicPartition, Long> beginningOffsets = consumerApi.beginningOffsets(allPartitions);
        Map<TopicPartition, Long> endOffsets = consumerApi.endOffsets(allPartitions);

        return createTopicsDetailsMapResponse(topicsList, beginningOffsets, endOffsets);
    }

    @Override
    public List<MessageDto> getPartitionMessages(TopicPartition topicPartition, int offset, int number) {
        Set<TopicPartition> partitionSet = new HashSet<>(Arrays.asList(topicPartition));
        return consumerApi.getPartitionMessages(partitionSet, offset, number);
    }

    @Override
    public ConfigTopicUpdateResult updateTopicConfig(ConfigTopicUpdateDto configTopicUpdateDto) {
        StatusEnum updateStatus = adminApi.updateTopicConfig(configTopicUpdateDto);
        ConfigTopicUpdateResult result = new ConfigTopicUpdateResult().setStatusEnum(updateStatus);
        if (updateStatus == StatusEnum.OK) {
            result.setConfigDtoList(adminApi.listTopicConfigs(configTopicUpdateDto.getTopic()));
        } else {
            result.setConfigDtoList(null);
        }
        return result;
    }

    @Override
    public StatusEnum sendMessage(MessageDto messageDto) {
        return producerApi.sendMessage(messageDto);
    }

    private Set<TopicPartition> allPartitionsInTopics(Map<String, List<PartitionInfo>> topics) {
        return topics.entrySet().stream() // Iterating over a topicMap collection Map<TopicName, List<PartitionInfo>>
                .flatMap(map -> map.getValue().stream())
                .map(partitionInfo -> new TopicPartition(
                        partitionInfo.topic(),
                        partitionInfo.partition())
                )
                .collect(Collectors.toSet());
    }

    private List<TopicDetailsDto> createTopicsDetailsMapResponse(Map<String, List<PartitionInfo>> topicsMap, Map<TopicPartition, Long> beginningOffsets, Map<TopicPartition, Long> endOffsets) {
        return topicsMap.entrySet().stream() // Iterating over a topicMap collection Map<TopicName, List<PartitionInfo>>
                .map(map -> new TopicDetailsDto()
                        .setName(map.getKey())
                        .setConfigs(adminApi.listTopicConfigs(map.getKey()))
                        .setPartitions(map.getValue().stream() // Iterating over all topic partitionInfo and collect from them specific data to PartitionDetails
                                .map(partitionInfo -> new PartitionDetails()
                                        .setPartition(partitionInfo.partition()) // partition : int
                                        .setLeader(partitionInfo.leader().id()) // leader : int
                                        .setBeginningOffset(beginningOffsets.get(new TopicPartition(map.getKey(),partitionInfo.partition())))
                                        .setEndOffset(endOffsets.get(new TopicPartition(map.getKey(), partitionInfo.partition())))
                                        .setReplicas(Arrays.stream(partitionInfo.replicas()) // replicas : List<Integer>
                                                .map(replica -> new Replica()
                                                        .setBroker(replica.id())
                                                        .setLeader(replica.id() == partitionInfo.leader().id())
                                                        .setInSync(Arrays.stream(partitionInfo.inSyncReplicas())
                                                                .anyMatch(inSyncNode -> inSyncNode.id() == replica.id())
                                                        ))
                                                .collect(Collectors.toList())))
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }
}
