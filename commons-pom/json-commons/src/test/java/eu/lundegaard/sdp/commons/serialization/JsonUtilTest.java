package eu.lundegaard.sdp.commons.serialization;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.NullNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import eu.lundegaard.sdp.commons.io.ResourceUtils;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static org.junit.Assert.*;

public class JsonUtilTest {
    private static final TypeReference<Map<String, Object>> MAP_TYPE_REFERENCE = new TypeReference<Map<String, Object>>() {};
    @Test
    public void toJson() {
        Foo foo = new Foo();
        foo.setName("SDP");
        String json = JsonUtil.toJson(foo);
        assertEquals("{\"name\":\"SDP\"}", json);
    }

    @Test
    public void fromJson() {
        Foo foo = JsonUtil.fromJson(ResourceUtils.asString("json/simple.json"), Foo.class);
        assertEquals("SDP", foo.getName());
    }

    @Test
    public void fromJsonUsingTypeReference() {
        List<Foo> foo = JsonUtil.fromJson(ResourceUtils.asString("json/simple_list.json"), new TypeReference<List<Foo>>() {
        });
        assertNotNull(foo);
        assertEquals(2, foo.size());
        String[] names = foo.stream().map(Foo::getName).sorted().toArray(String[]::new);
        assertArrayEquals(new String[]{"Java", "SDP"}, names);
    }

    @Test
    public void transformNull() {
        JsonNode json = JsonUtil.transform(null, JsonNode.class);
        assertEquals(NullNode.getInstance(),json);

        Foo fooAsJson = JsonUtil.transform(null, Foo.class);
        assertNull(fooAsJson);
    }

    @Test
    public void transformToJsonNode() {
        Foo original = new Foo("A");
        JsonNode json = JsonUtil.transform(original, JsonNode.class);
        assertEquals(json.get("name").asText(), "A");
        Foo transformed = JsonUtil.transform(json, Foo.class);
        assertEquals(original, transformed);
    }

    @Test
    public void transformToMap() {
        Foo original = new Foo("A");
        Map<String, Object> map = JsonUtil.transform(original, MAP_TYPE_REFERENCE);
        assertEquals(map.get("name"), "A");
        Foo transformed = JsonUtil.transform(map, Foo.class);
        assertEquals(original, transformed);
    }

    @Test
    /**
     * Following test passes since {@link Baz} is annotated with {@link JsonInclude.Include.NON_NULL}, therefore null values are omitted.
     */
    public void mergeWithNonNull() {
        Baz original = new Baz("BAZ", new Foo("A"));
        Baz update = new Baz(null, new Foo("B"));
        Baz merge = JsonUtil.merge(original, update);
        assertEquals("BAZ", merge.getName());
        assertEquals("B", merge.getFoo().getName());
    }

    @Test
    /**
     * Following test passes since {@link Bar} is annotated with {@link JsonInclude.Include.ALWAYS}, therefore update removes some fields.
     */
    public void mergeWithAlways() {
        Bar original = new Bar("BAZ", new Foo("A"), new Baz("A2", new Foo("A2")));
        Bar update = new Bar(null, new Foo("B"), new Baz());
        Bar merge = JsonUtil.merge(original, update);
        assertNull(merge.getName());
        assertEquals("B", merge.getFoo().getName());
        assertNotNull(merge.getBaz());
        assertNull(merge.getBaz().getFoo());
        assertNull(merge.getBaz().getName());
    }

    @Test
    public void mergeWithJSON() {
        Baz original = new Baz("BAZ", new Foo("A"));
        String update = "{\"name\":\"BAZU\", \"foo\": { \"name\" : \"B\"}}";
        Baz merge = JsonUtil.merge(original, update);
        Baz expected = new Baz("BAZU", new Foo("B"));
        assertEquals(expected, merge);
    }

    @Test
    public void mergeMapWithJSON() {
        Map<String, Object> empty = new HashMap<>();
        Map<String, Object> fstMerge = JsonUtil.merge(empty, "{\"a\" : \"a\"}");
        Map<String, Object> sndMerge = JsonUtil.merge(fstMerge, "{\"b\" : \"b\"}");
        ObjectNode root = JsonUtil.transform(sndMerge, ObjectNode.class);
        assertEquals("a", root.get("a").textValue());
        assertEquals("b", root.get("b").textValue());
    }

    public static class Foo {
        private String name;

        public Foo() {

        }

        public Foo(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Foo foo = (Foo) o;
            return Objects.equals(name, foo.name);
        }

        @Override
        public int hashCode() {
            return Objects.hash(name);
        }
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Baz {
        private String name;
        private Foo foo;

        public Baz() {
        }

        public Baz(String name, Foo foo) {
            this.name = name;
            this.foo = foo;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Foo getFoo() {
            return foo;
        }

        public void setFoo(Foo foo) {
            this.foo = foo;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Baz baz = (Baz) o;
            return Objects.equals(name, baz.name) &&
                    Objects.equals(foo, baz.foo);
        }

        @Override
        public int hashCode() {

            return Objects.hash(name, foo);
        }
    }

    @JsonInclude(JsonInclude.Include.ALWAYS)
    public static class Bar extends Baz {
        private Baz baz;
        public Bar() {
        }

        public Bar(String name, Foo foo, Baz baz) {
            super(name, foo);
            this.baz = baz;
        }

        public Baz getBaz() {
            return baz;
        }

        public void setBaz(Baz baz) {
            this.baz = baz;
        }
    }
}