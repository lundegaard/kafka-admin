package eu.lundegaard.sdp.commons.serialization;

import com.fasterxml.jackson.databind.ObjectMapper;
import eu.lundegaard.commons.jackson.ObjectMapperFactory;
import eu.lundegaard.sdp.commons.io.ResourceUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

public final class PropertiesUtil {
    private static final ObjectMapper INSTANCE = ObjectMapperFactory.createObjectMapper();
    private PropertiesUtil() {
    }

    /**
     * Constructs JavaBean using given properties applying property key as matching criteria for passing values.
     * Function also supports 'prefixing' for mapping property to corresponding class fields.
     * F.e: server.host will be mapped to host field when server. prefix is passed.
     *
     * @param properties from which JavaBean should be created.
     * @param type class for JSON to deserialize correct instance
     * @param prefixes when empty JavaBean is constructed from all properties, otherwise it's applied only on keys with same prefix
     * @return instance created from Jackson mapping
     */
    public static <T> T fromProperties(Properties properties, Class<T> type, String... prefixes) {
        Map<String, Object> fieldsAsMap = new HashMap<>();
        if(ArrayUtils.isEmpty(prefixes)) {
            prefixes = ArrayUtils.add(prefixes, StringUtils.EMPTY);
        }
        for(String prefix: prefixes) {
            Map<String, Object> fields = properties.entrySet().stream()
                    .filter(entry -> String.class.isInstance(entry.getKey()))
                    .filter(entry -> entry.getKey().toString().startsWith(prefix))
                    .collect(Collectors.toMap(
                            e -> StringUtils.removeStart(e.getKey().toString(), prefix),
                            Map.Entry::getValue));
            fieldsAsMap.putAll(fields);
        }
        return INSTANCE.convertValue(fieldsAsMap, type);
    }


    /**
     * @link {@link #fromProperties(Properties, Class, String...)}
     * @param path defining property resource
     * @param type class for JSON to deserialize correct instance
     * @param prefixes when empty JavaBean is constructed from all properties, otherwise it's applied only on keys with same prefix
     * @return instance created from Jackson mapping
     */
    public static <T> T fromProperties(String path, Class<T> type, String... prefixes) {
        Properties properties = ResourceUtils.asProperties(path);
        return fromProperties(properties, type, prefixes);
    }
}
