package eu.lundegaard.sdp.commons.serialization;

import org.apache.kafka.common.serialization.Serde;

/**
 * Builder class for creating Serdes.
 */
public interface SerdeBuilder {
    <T> Serde<T> getSerde(Class<T> type, boolean isKeySerde);
}
