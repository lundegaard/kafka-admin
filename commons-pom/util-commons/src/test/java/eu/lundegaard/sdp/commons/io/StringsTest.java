package eu.lundegaard.sdp.commons.io;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class StringsTest {
    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][]{
                //Expected      //Template
                {"Hello world", "{} {}", new Object[]{"Hello", "world"}},
                {"Year 2018", "{} {}", new Object[]{"Year", 2018L}},
                {"${VAR}", "${{}}", new Object[]{"VAR"}},
                {"No variable", "No variable", new Object[0]},
                {"Missing variable: {}", "Missing variable: {}", new Object[0]},
        });
    }

    private String expected;
    private String template;
    private Object[] params;

    public StringsTest(String expected, String template, Object[] params) {
        this.expected = expected;
        this.template = template;
        this.params = params;
    }

    @Test
    public void test() {
        assertEquals(expected, Strings.format(template, params));
    }
}