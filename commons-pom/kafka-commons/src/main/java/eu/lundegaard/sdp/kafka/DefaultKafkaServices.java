package eu.lundegaard.sdp.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DefaultKafkaServices implements KafkaServices {
    private String kafkaAddress;
    private String zookeeperAddress;
    private String schemaRegistryUrl;
}
