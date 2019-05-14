package eu.lundegaard.sdp.commons.serialization;

import java.util.Map;
import org.apache.kafka.common.serialization.Serializer;

/**
 * @author Ales Rybak(ales.rybak@lundegaard.eu)
 */
public class JsonSerializer<T> implements Serializer<T> {

    @Override
    public void configure(Map<String, ?> map, boolean b) {

    }

    @Override
    public byte[] serialize(String topic, T objectToSerialize) {
        return JsonUtil.toJson(objectToSerialize).getBytes();
    }

    @Override
    public void close() {

    }

}
