package eu.lundegaard.sdp.commons.serialization;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import eu.lundegaard.sdp.commons.io.Strings;

import java.io.*;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Utility class designed for interpolate given JSON with parameters using
 */
public final class ParametrizedJson {
    private static final JsonFactory factory = new JsonFactory();

    private ParametrizedJson() {
    }

    /**
     * @param template JSON string with parameters with format ${VAR}
     * @param params map of parameters which should be injected in template
     * @return input stream with interpolated JSON
     * @throws ConversionException when
     */
    public static InputStream interpolate(InputStream template, Map<String, ?> params) throws ConversionException {

        try (JsonParser parser = factory.createParser(template);
             PipedOutputStream stream = new PipedOutputStream();
             JsonGenerator generator = factory.createGenerator(stream)
        ) {
            InputStream result = new PipedInputStream(stream);
            interpolate(parser, params, generator);
            return result;
        } catch (IOException ex) {
            throw new ConversionException("Failed to interpolate JSON template", ex);
        }
    }

    /**
     * @param template JSON string with parameters with format ${VAR}
     * @param params map of parameters which should be injected in template
     * @return interpolated JSON
     * @throws ConversionException when
     */
    public static String interpolate(String template, Map<String, ?> params) throws ConversionException {
        StringWriter writer = new StringWriter();
        try (JsonParser parser = factory.createParser(template);
             JsonGenerator generator = factory.createGenerator(writer)
        ) {
            interpolate(parser, params, generator);
        } catch (IOException ex) {
            throw new ConversionException("Failed to interpolate JSON template", ex);
        }
        return writer.toString();
    }

    private static void interpolate(JsonParser parser, Map<String, ?> params, JsonGenerator generator) throws IOException {
        Map<String, Object> interpolatedParams = params.entrySet()
                .stream()
                .collect(Collectors.toMap(e -> Strings.format("${{}}", e.getKey()), Map.Entry::getValue));
        while (parser.nextToken() != null) {
            switch (parser.currentToken()) {
                case VALUE_STRING:
                    interpolateIfNeeded(parser, generator, interpolatedParams);
                    break;
                default:
                    generator.copyCurrentEvent(parser);
            }

        }
    }

    private static void interpolateIfNeeded(JsonParser parser, JsonGenerator generator, Map<String, ?> params) throws IOException {
        String value = parser.getText();
        if (value.startsWith("$")) {
            Object realValue = params.get(value);
            if (String.class.isInstance(realValue)) {
                generator.writeString((String) realValue);
                return;
            }
            if (Long.class.isInstance(realValue)) {
                generator.writeNumber((Long) realValue);
                return;
            }
            if (Integer.class.isInstance(realValue)) {
                generator.writeNumber((Integer) realValue);
                return;
            }
            if (Double.class.isInstance(realValue)) {
                generator.writeNumber((Integer) realValue);
                return;
            }
            if (!realValue.getClass().isPrimitive()) {
                generator.writeObject(realValue);
            } else {
                throw new ConversionException("Unsupported type: " + realValue.getClass());
            }
        } else {
            generator.writeString(value);
        }
    }
}
