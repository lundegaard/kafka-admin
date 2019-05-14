package eu.lundegaard.sdp.commons.serialization;

import java.util.Map;
import org.apache.kafka.common.serialization.Deserializer;

/**
 * @author Ales Rybak(ales.rybak@lundegaard.eu)
 */
public class JsonDeserializer<T> implements Deserializer<T> {
    private Class<T> clazz;

    public JsonDeserializer(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Override
    public void configure(Map<String, ?> map, boolean b) {

    }

    @Override
    public T deserialize(String topic, byte[] bytes) {
        if (topic == null || bytes == null) { return null; }
        return JsonUtil.fromJson(new String(bytes), clazz);
    }

    @Override
    public void close() {

    }
}
