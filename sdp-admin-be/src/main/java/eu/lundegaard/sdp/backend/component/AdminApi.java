package eu.lundegaard.sdp.backend.component;

import eu.lundegaard.sdp.backend.dto.*;

import java.util.List;
import java.util.Set;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
public interface AdminApi {

    void createTopics(String topic, int numPartition, short replicationFactor);

    StatusEnum deleteTopic(String topic);

    Set<String> listTopics();

    List<ConfigDto> listResourceConfigs(ConfigIdDto configIdDto);

    List<ConfigDto> listTopicConfigs(String topic);

    List<Integer> listBrokers();

    List<BrokersDto> listBrokersConfigs();

    StatusEnum updateTopicConfig(ConfigTopicUpdateDto configTopicUpdateDto);
}
