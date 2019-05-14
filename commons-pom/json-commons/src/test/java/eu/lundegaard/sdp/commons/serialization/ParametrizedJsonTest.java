package eu.lundegaard.sdp.commons.serialization;

import eu.lundegaard.commons.collections.Maps;
import eu.lundegaard.sdp.commons.io.ResourceUtils;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class ParametrizedJsonTest {
    private static final Logger LOGGER = LoggerFactory.getLogger(ParametrizedJsonTest.class);

    @ClassRule
    public static TemporaryFolder testFolder = new TemporaryFolder();
    private String jsonWithInteger = "{\"age\":\"${AGE}\", \"t\": \"0\"}";
    private static final String EXPECTED = "{\"age\":\"1\",\"t\":\"0\"}";


    @Test
    public void integerInterpolation() throws IOException {
        String json = ParametrizedJson.interpolate(jsonWithInteger, Maps.of("AGE", 1L).build());
        assertEquals("{\"age\":1,\"t\":\"0\"}", json);
    }

    @Test
    public void stringInterpolation() throws IOException {
        String json = ParametrizedJson.interpolate(jsonWithInteger, Maps.of("AGE", "1").build());
        assertEquals(EXPECTED, json);
    }

    @Test
    public void streamInterpolation() throws IOException {
        //Prepare unique test file for this suite
        File file = testFolder.newFile("test.json");
        try (FileWriter writer = new FileWriter(file)) {
            writer.write(jsonWithInteger);
        }
        //Test
        InputStream stream = ParametrizedJson.interpolate(
                ResourceUtils.asInputStream("file:" + file.getAbsolutePath()),
                Maps.of("AGE", "1").build()
        );
        //Validate stream and content
        assertTrue(stream.available() > 0);
        String json = ResourceUtils.asString(stream);
        assertEquals(EXPECTED, json);

    }
}