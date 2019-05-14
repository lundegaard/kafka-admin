package eu.lundegaard.sdp.commons.serialization;

import eu.lundegaard.sdp.commons.io.ResourceUtils;
import org.junit.Test;

import java.util.Properties;

import static org.junit.Assert.assertEquals;

public class PropertiesUtilTest {
    @Test
    public void mapClass() {
        Properties properties = ResourceUtils.asProperties("properties/simple.properties");
        Config config = PropertiesUtil.fromProperties(properties, Config.class, "producer." , "server.");
        assertEquals("kafka:9092", config.getHost());
        assertEquals(Integer.valueOf(42), config.getAcks());
    }


    @Test
    public void noPrefix() {
        Properties properties = ResourceUtils.asProperties("properties/no_prefix.properties");
        Config config = PropertiesUtil.fromProperties(properties, Config.class);
        assertEquals("kafka:9092", config.getHost());
        assertEquals(Integer.valueOf(42), config.getAcks());
    }

    public static class Config {
        private String host;
        private Integer acks;
        private Long unknown;

        public String getHost() {
            return host;
        }

        public void setHost(String host) {
            this.host = host;
        }

        public Integer getAcks() {
            return acks;
        }

        public void setAcks(Integer acks) {
            this.acks = acks;
        }

        public Long getUnknown() {
            return unknown;
        }

        public void setUnknown(Long unknown) {
            this.unknown = unknown;
        }
    }
}