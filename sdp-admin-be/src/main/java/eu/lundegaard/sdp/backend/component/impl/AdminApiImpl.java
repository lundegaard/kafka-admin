package eu.lundegaard.sdp.backend.component.impl;

import eu.lundegaard.sdp.backend.Constants;
import eu.lundegaard.sdp.backend.component.AdminApi;
import eu.lundegaard.sdp.backend.dto.*;
import eu.lundegaard.sdp.commons.io.Strings;
import eu.lundegaard.sdp.kafka.KafkaFactory;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.*;
import org.apache.kafka.common.KafkaFuture;
import org.apache.kafka.common.Node;
import org.apache.kafka.common.config.ConfigException;
import org.apache.kafka.common.config.ConfigResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Component
@RequiredArgsConstructor
public class AdminApiImpl implements AdminApi {

    private static final Logger LOG = LoggerFactory.getLogger(AdminApiImpl.class);

    private final KafkaFactory factory;

    private AdminClient adminClient;

    @PostConstruct
    private void init() {
        LOG.info("Creating Kafka AdminClient.");
        this.adminClient = factory.newAdminClient();
    }

    @PreDestroy
    private void destroy() {
        LOG.info("Closing kafka AdminClient.");
        if (this.adminClient != null) {
            this.adminClient.close();
        }
    }

    @Override
    public void createTopics(String topic, int numPartition, short replicationFactor) {
        Map<String, String> config = new HashMap<>();
        adminClient.createTopics(asList(
                new NewTopic(topic, numPartition, replicationFactor).configs(config)
        ));
    }

    @Override
    public StatusEnum deleteTopic(String topic) {
        DeleteTopicsResult dtr = adminClient.deleteTopics(Arrays.asList(topic));
        KafkaFuture<Void> kf = dtr.values().get(topic);
        try {
            kf.get(Constants.WAIT_LIMIT_MS, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            return StatusEnum.BAD_REQUEST;
        } catch (ExecutionException e) {
            return StatusEnum.NOT_FOUND;
        } catch (TimeoutException e) {
            return StatusEnum.REQUEST_TIMEOUT;
        }
        return StatusEnum.OK;
    }

    @Override
    public Set<String> listTopics() {
        try {
            return adminClient.listTopics().names().get(Constants.WAIT_LIMIT_MS, TimeUnit.MILLISECONDS);
        } catch (TimeoutException | InterruptedException | ExecutionException e) {
            LOG.warn("Failed to retrieve topic names in {} ms", Constants.WAIT_LIMIT_MS);
            return Collections.emptySet();
        }
    }

    @Override
    public List<ConfigDto> listResourceConfigs(ConfigIdDto configIdDto) {
        Collection<ConfigEntry> configEntries = getConfigEntryCollection(configIdDto);
        if (configEntries == null) {
            return null;
        }
        return configEntries.stream()
                .map(configEntry -> new ConfigDto()
                        .setName(configEntry.name())
                        .setValue(configEntry.value())
                        .setDefault(configEntry.isDefault())
                        .setSensitive(configEntry.isSensitive())
                        .setReadOnly(configEntry.isReadOnly()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ConfigDto> listTopicConfigs(String topic) {
        Collection<ConfigEntry> configEntries = getConfigEntryCollection(new ConfigIdDto(topic, ConfigTypeEnum.TOPIC));
        if (configEntries == null) {
            return null;
        }
        return configEntries.stream()
                .map(configEntry -> new ConfigDto()
                        .setName(configEntry.name())
                        .setValue(configEntry.value())
                        .setDefault(isStaticTopicConfig(configEntry.source(), topic))
                        .setSensitive(configEntry.isSensitive())
                        .setReadOnly(configEntry.isReadOnly()))
                .collect(Collectors.toList());
    }

    private Boolean isStaticTopicConfig(ConfigEntry.ConfigSource source, String topic) {
        switch (source) {
            case STATIC_BROKER_CONFIG:           // static broker config provided as broker properties at start up (e.g. server.properties file)
            case DEFAULT_CONFIG:                 // built-in default configuration for configs that have a default value
                return Boolean.TRUE;
            case DYNAMIC_DEFAULT_BROKER_CONFIG:  // dynamic broker config that is configured as default for all brokers in the cluster
            case DYNAMIC_BROKER_CONFIG:          // dynamic broker config that is configured for a specific broker
            case DYNAMIC_TOPIC_CONFIG:           // dynamic topic config that is configured for a specific topic
            case UNKNOWN:                        // source unknown e.g. in the ConfigEntry used for alter requests where source is not set
                return Boolean.FALSE;
            default:
                throw new ConfigException(Strings.format("Unknown source ({}) set for topic {}", source, topic));
        }
    }

    @Override
    public List<Integer> listBrokers() {
        Collection<Node> nodes;
        try {
            nodes = adminClient.describeCluster().nodes().get(Constants.WAIT_LIMIT_MS, TimeUnit.MILLISECONDS);
        } catch (InterruptedException | ExecutionException | TimeoutException e) {
            LOG.warn("Failed to retrieve node ids in {} ms", Constants.WAIT_LIMIT_MS);
            return Collections.emptyList();
        }
        return nodes.stream().map(Node::id).collect(Collectors.toList());
    }

    @Override
    public List<BrokersDto> listBrokersConfigs() {
        return this.listBrokers().stream()
                .map(brokerId -> new BrokersDto()
                        .setId(brokerId)
                        .setConfigs(this.listResourceConfigs(
                                new ConfigIdDto(brokerId.toString(), ConfigTypeEnum.BROKER))))
                .collect(Collectors.toList());
    }

    @Override
    public StatusEnum updateTopicConfig(ConfigTopicUpdateDto configTopicUpdateDto) {
        // Check if topic and config Name exists
        if (!this.listTopics().stream().anyMatch(topic -> topic.equals(configTopicUpdateDto.getTopic()))) {
            return StatusEnum.NOT_FOUND;
        };
        if (!this.listTopicConfigs(configTopicUpdateDto.getTopic()).stream()
                .anyMatch(configDTO -> configDTO.getName().equals(configTopicUpdateDto.getName()))) {
            return StatusEnum.BAD_REQUEST;
        }

        // get Not default configs Collection from requested topic
        Collection<ConfigEntry> allTopicCongisEntries = getConfigEntryCollection(new ConfigIdDto(configTopicUpdateDto.getTopic(), ConfigTypeEnum.TOPIC));
        if (allTopicCongisEntries == null) {
            return StatusEnum.BAD_REQUEST;
        }
        Collection<ConfigEntry> notDefaultConfigEntries = allTopicCongisEntries.stream()
                .map(configEntry -> {
                    if (configEntry.name().equals(configTopicUpdateDto.getName())) {
                        return new ConfigEntry(configTopicUpdateDto.getName(), configTopicUpdateDto.getValue());
                    }
                    return configEntry;
                })
                .filter(configEntry -> !configEntry.isDefault())
                .collect(Collectors.toList());

        // alter Configs
        Map<ConfigResource, Config> alterMap = new HashMap<>();
        alterMap.put(
                new ConfigResource(ConfigResource.Type.TOPIC, configTopicUpdateDto.getTopic()),
                new Config(notDefaultConfigEntries)
        );
        KafkaFuture<Void> kafkaFuture = adminClient.alterConfigs(alterMap).all();
        try {
            kafkaFuture.get(Constants.WAIT_LIMIT_MS, TimeUnit.MILLISECONDS);
        } catch (TimeoutException e) {
            return StatusEnum.REQUEST_TIMEOUT;
        } catch (InterruptedException | ExecutionException e) {
            return StatusEnum.BAD_REQUEST;
        }
        if (kafkaFuture.isCompletedExceptionally()) {
            return StatusEnum.BAD_REQUEST;
        }
        if (kafkaFuture.isDone()) {
            return StatusEnum.OK;
        }
        return StatusEnum.BAD_REQUEST;
    }

    private Collection<ConfigEntry> getConfigEntryCollection(ConfigIdDto configIdDto) {
        ConfigResource resource = null;
        switch (configIdDto.getType()) {
            case TOPIC:
                resource = new ConfigResource(ConfigResource.Type.TOPIC, configIdDto.getName());
                break;
            case BROKER:
                resource = new ConfigResource(ConfigResource.Type.BROKER, configIdDto.getName());
                break;
        }
        Map<ConfigResource, KafkaFuture<Config>> configs =
                adminClient.describeConfigs(new HashSet<>(Arrays.asList(resource))).values();

        Config config;
        try {
            config = configs.get(resource).get(Constants.WAIT_LIMIT_MS, TimeUnit.MILLISECONDS);
        } catch (InterruptedException | ExecutionException | TimeoutException e) {
            return null;
        }
        return config.entries();
    }
}
