package eu.lundegaard.sdp.commons.collection;

import org.junit.Test;

import java.util.Map;

import static org.junit.Assert.assertEquals;

public class MapsTest {

    @Test
    public void merge() {
        Map<String, Integer> left = eu.lundegaard.commons.collections.Maps.of("a", 1).put("b", 1).build();
        Map<String, Integer> right = eu.lundegaard.commons.collections.Maps.of("a", 1).put("c", 1).build();
        Map<String, Integer> merge = Maps.merge(left, right, Integer::sum);
        assertEquals(3, merge.size());
        assertEquals(2, merge.get("a").intValue());
        assertEquals(1, merge.get("b").intValue());
        assertEquals(1, merge.get("c").intValue());
    }

    @Test
    public void mapValue() {
        Map<String, Integer> input = eu.lundegaard.commons.collections.Maps.of("a", 1).put("b", 1).build();
        Map<String, String> transformed = Maps.mapValue(input, String::valueOf);
        Map<String, Integer> result = Maps.mapValue(transformed, Integer::valueOf);
        assertEquals(input, result);
    }
}