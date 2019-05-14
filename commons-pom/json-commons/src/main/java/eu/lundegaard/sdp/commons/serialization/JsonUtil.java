package eu.lundegaard.sdp.commons.serialization;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.PrettyPrinter;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import eu.lundegaard.commons.jackson.ObjectMapperFactory;
import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;

public final class JsonUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(JsonUtil.class);
    private static final ObjectMapper INSTANCE = ObjectMapperFactory.createObjectMapper()
                                                                    .enable(JsonParser.Feature.ALLOW_COMMENTS)
                                                                    .enable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS)
                                                                    .disable(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS)
                                                                    .registerModule(new JavaTimeModule());

    private static final String EMPTY_JSON = "{}";

    private JsonUtil() {
    }

    /**
     * @param entity
     * @return JSON representation of given entity as String
     * @throws ConversionException in case when entity could not be serialized.
     */
    public static String toJson(Object entity) {
        try {
            return INSTANCE.writeValueAsString(entity);
        } catch (JsonProcessingException ex) {
            LOGGER.error("Cannot convert object to JSON.", ex);
            throw new ConversionException(ex);
        }
    }

    /**
     * @param entity
     * @param printer for writing entity in desired format
     * @return JSON representation of given entity as String
     * @throws ConversionException in case when entity could not be serialized.
     */
    public static String toJson(Object entity, PrettyPrinter printer) {
        try {
            return INSTANCE.writer(printer).writeValueAsString(entity);
        } catch (JsonProcessingException ex) {
            LOGGER.error("Cannot convert object to JSON.", ex);
            throw new ConversionException(ex);
        }
    }

    /**
     * @param json
     * @param clazz type which should be returned
     * @return deserialized instance of given json
     * @throws ConversionException in case when entity could not be serialized.
     */
    public static <T> T fromJson(String json, Class<T> clazz) {
        Validate.notNull(json);
        try {
            return INSTANCE.readValue(json, clazz);
        } catch (IOException ex) {
            LOGGER.error("Cannot convert string json into class: {}", clazz.getName(), ex);
            throw new ConversionException(ex);
        }
    }

    public static <T> T fromJson(InputStream stream, Class<T> clazz) {
        Validate.notNull(stream);
        try {
            return INSTANCE.readValue(stream, clazz);
        } catch (IOException ex) {
            LOGGER.error("Cannot convert stream into class: {}", clazz.getName(), ex);
            throw new ConversionException(ex);
        }
    }

    /**
     * @param json
     * @param clazz type which should be returned
     * @return deserialized instance of given json
     * @throws ConversionException in case when entity could not be serialized.
     */
    public static <T> T fromJson(String json, TypeReference<T> clazz) {
        Validate.notNull(json);
        try {
            return INSTANCE.readValue(json, clazz);
        } catch (IOException ex) {
            LOGGER.error("Cannot convert string json into class: {}", clazz.getType().getTypeName(), ex);
            throw new ConversionException(ex);
        }
    }

    /**
     * @param stream
     * @param clazz  type which should be returned
     * @return deserialized instance of given json
     * @throws ConversionException in case when entity could not be serialized.
     */
    public static <T> T fromJson(InputStream stream, TypeReference<T> clazz) {
        Validate.notNull(stream);
        try {
            return INSTANCE.readValue(stream, clazz);
        } catch (IOException ex) {
            LOGGER.error("Cannot convert stream into class: {}", clazz.getType().getTypeName(), ex);
            throw new ConversionException(ex);
        }
    }

    /**
     * @param source which should be transformed
     * @param clazz  target class type
     * @return transformed instance of type clazz taken from given source
     * @throws ConversionException in case when entity could not transformed due to incompatible type.
     */
    public static <T> T transform(Object source, Class<T> clazz) {
        try {
            return INSTANCE.convertValue(source, clazz);
        } catch (IllegalArgumentException ex) {
            throw new ConversionException(ex);
        }
    }

    /**
     * @see JsonUtil#transform(Object, Class)
     */
    public static <T> T transform(Object source, TypeReference<T> clazz) {
        try {
            return INSTANCE.convertValue(source, clazz);
        } catch (IllegalArgumentException ex) {
            throw new ConversionException(ex);
        }
    }

    /**
     * Merges source and updates together as new instance leaving source intact.
     *
     * @param source instance
     * @param update String with changes
     * @return applied changes from update to source as new instance
     * @throws ConversionException in case when entity could not merged.
     */
    public static <T> T merge(T source, String update) {
        try {
            return INSTANCE.readerForUpdating(source).readValue(update);
        } catch (IOException ex) {
            throw new ConversionException(ex);
        }
    }

    /**
     * Merges source and updates together as new instance leaving source intact.
     *
     * @param source instance
     * @param update JsonNode with changes
     * @return applied changes from update to source as new instance
     * @throws ConversionException in case when entity could not merged.
     */
    public static <T> T merge(T source, JsonNode update) {
        try {
            return INSTANCE.readerForUpdating(source).readValue(update);
        } catch (IOException ex) {
            throw new ConversionException(ex);
        }
    }

    /**
     * Merges source and updates together as new instance leaving source intact.
     *
     * @param source instance
     * @param update update instance of same type
     * @return applied changes from update to source as new instance
     * @throws ConversionException in case when entity could not merged.
     */
    public static <T> T merge(T source, T update) {
        JsonNode json = transform(update, JsonNode.class);
        return merge(source, json);
    }

    /**
     * @return empty ObjectNode '{}'
     */
    public static ObjectNode getEmptyObjectNode() {
        return JsonUtil.fromJson(EMPTY_JSON, ObjectNode.class);
    }
}
