package eu.lundegaard.sdp.dto;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class SApmFrontEndDtoTest {

    @Test
    public void testChainSetting() {
        SApmFrontEndDto samp = ((SApmFrontEndDto) new SApmFrontEndDto().setD("D").setEa("EA").setIp("127.0.0.1"));
        assertEquals("D", samp.getD());
        assertEquals("EA", samp.getEa());
        assertEquals("127.0.0.1", samp.getIp());
    }
}