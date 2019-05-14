package eu.lundegaard.sdp.commons.io;

import org.apache.commons.io.FilenameUtils;
import org.junit.BeforeClass;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Properties;

import static org.junit.Assert.*;

public class ResourceUtilsTest {
    private static final String EMPTY_JSON = "{}";
    @ClassRule
    public static TemporaryFolder testFolder = new TemporaryFolder();
    private static File file;

    @BeforeClass
    public static void init() throws IOException {
        File tempDir = testFolder.getRoot();
        file = File.createTempFile("test", ".json", tempDir);
        FileWriter fileWriter = new FileWriter(file);
        fileWriter.append("{}");
        fileWriter.close();
    }

    @Test
    public void asStringFromFile() throws IOException {
        String json = ResourceUtils.asString("file:" + file.getAbsolutePath());
        assertEquals(EMPTY_JSON, json);
    }

    @Test
    public void asStringFromUrl() throws URISyntaxException, MalformedURLException {
        String path = FilenameUtils.separatorsToUnix(file.getAbsolutePath());
        String json = ResourceUtils.asString(new URI("file:///" + path).toURL());
        assertEquals(EMPTY_JSON, json);
    }

    @Test
    public void asStringFromClasspath() {
        String json = ResourceUtils.asString("json/simple.json");
        assertEquals("{\"name\":\"SDP\"}", json);
    }

    @Test(expected = IllegalArgumentException.class)
    public void asStringFromClasspathUsingWildcard() {
        ResourceUtils.asString("classpath*:**/simple.json");
        fail("Exception should be thrown");
    }

    @Test
    public void asInputStreamToString() throws IOException {
        InputStream inputStream = ResourceUtils.asInputStream("file:" + file.getAbsolutePath());
        assertTrue(inputStream.available() > 0);
        String json = ResourceUtils.asString(inputStream);
        assertEquals(EMPTY_JSON, json);
    }

    @Test
    public void asProperties() {
        Properties properties = ResourceUtils.asProperties("properties/simple.properties");
        assertEquals("kafka:9092", properties.getProperty("server.host"));
        assertEquals("all", properties.getProperty("producer.acks"));
    }
}