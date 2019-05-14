package eu.lundegaard.sdp.commons.serialization;

import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Deserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

public class DelegatedDeserializer implements Deserializer<Object> {
    private static final Logger LOGGER = LoggerFactory.getLogger(DelegatedDeserializer.class);
    private Deserializer<?>[] deserializers;

    public DelegatedDeserializer(Deserializer<?>... deserializer) {
        this.deserializers = deserializer;
    }

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        for(Deserializer<?> deserializer : deserializers) {
            deserializer.configure(configs, isKey);
        }
    }

    @Override
    public Object deserialize(String topic, byte[] data) {
        for(Deserializer<?> deserializer : deserializers) {
            try {
                return deserializer.deserialize(topic, data);
            } catch (RuntimeException ex) {
                LOGGER.trace("Failed to deserialize data", ex);
            }
        }
        throw new SerializationException("No available deserializers were able to process incoming data");

    }

    @Override
    public void close() {
        for(Deserializer<?> deserializer : deserializers) {
            deserializer.close();
        }
    }
}
