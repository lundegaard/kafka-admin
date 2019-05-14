package eu.lundegaard.sdp.commons.io;

import org.slf4j.helpers.MessageFormatter;

public final class Strings {
    private Strings() {
    }

    /**
     * Interpolated given params into template exactly same as SL4J does.
     * @param template string using {} for replacement
     * @param params array of parameters which should be interpolated
     * @return interpolated String created from given template and params
     */
    public static String format(String template, Object... params) {
        return MessageFormatter.arrayFormat(template, params).getMessage();
    }
}
