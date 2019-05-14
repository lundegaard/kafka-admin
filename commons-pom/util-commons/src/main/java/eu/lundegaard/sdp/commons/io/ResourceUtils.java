package eu.lundegaard.sdp.commons.io;


import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.Validate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public final class ResourceUtils {
    private static final Pattern URI_PATTERN = Pattern.compile("^(([a-zA-Z](\\w|\\+|\\.|-)*):)?(.*)");

    //No Spring
    //Uri
    private ResourceUtils() {
    }

    public static String asString(InputStream stream) {
        try {
            return IOUtils.toString(stream, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new IllegalArgumentException("Failed convert stream to string", ex);
        }
    }

    public static String asString(String path) {
        try (InputStream stream = asInputStream(path)) {
            return IOUtils.toString(stream, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new IllegalArgumentException("Failed convert stream to string for path: " + path, ex);
        }
    }

    public static String asString(URL uri) {
        try (InputStream stream = uri.openStream()) {
            return IOUtils.toString(stream, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new IllegalArgumentException("Failed convert uri stream to string", ex);
        }
    }


    /**
     * @param path to resource
     * @return properties created out of resource defined by given path
     */
    public static Properties asProperties(String path) {
        Properties properties = new Properties();
        try (InputStream stream = ResourceUtils.asInputStream(path)) {
            properties.load(stream);
            return properties;
        } catch (IOException ex) {
            throw new IllegalArgumentException("Failed convert resource to properties", ex);
        }
    }

    public static InputStream asInputStream(String path) {
        try {
            Matcher matcher = URI_PATTERN.matcher(path);
            Validate.isTrue(matcher.matches(), "Invalid path format: " + path);
            String scheme = String.valueOf(matcher.group(2));
            String uriPath = matcher.group(4);
            switch (scheme) {
                case "file":
                    return new URL(path).openStream();
                case "classpath":
                default:
                    InputStream stream = Thread.currentThread().getContextClassLoader().getResourceAsStream(uriPath);
                    Validate.isTrue(stream != null, "Failed to read from: " + path);
                    return stream;
            }
        } catch (IOException ex) {
            throw new IllegalArgumentException("Failed to read from: " + path, ex);
        }
    }

    /**
     * Read file as stream of lines
     * @param path Path to file
     * @return stream of file content separated by linebreaks
     */
    public static Stream<String> readFileLines(String path) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(ResourceUtils.asInputStream(path)));
        return reader.lines();
    }
}
