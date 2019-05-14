package eu.lundegaard.sdp.commons.serialization;

import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;

/**
 *  JSON implementation of building Serdes.
 */
public class JsonSerdeBuilder implements SerdeBuilder {

    @Override
    public <T> Serde<T> getSerde(Class<T> type, boolean isKeySerde) {
        return Serdes.serdeFrom(
                new JsonSerializer<>(),
                new JsonDeserializer<>(type)
        );
    }
}
