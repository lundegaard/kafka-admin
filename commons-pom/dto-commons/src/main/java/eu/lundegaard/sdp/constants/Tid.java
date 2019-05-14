package eu.lundegaard.sdp.constants;

import lombok.Getter;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@Getter
public enum Tid {

    COFIDIS("SA-00010-1"),
    COFIDIS_PREVIEW("SA-D0010-1"),
    TEST("SA-99999-1");

    private String value;

    Tid(String s) {
        this.value = s;
    }

    @Override
    public String toString() {
        return value;
    }

    /**
     * @param value string representation ot tid
     * @return enum value of tid
     * @throws IllegalArgumentException when given value does not correspond with any known Tid
     */
    public static Tid of(String value) throws IllegalArgumentException {
        for (Tid tid : values()) {
            if(tid.value.equals(value)) {
                return tid;
            }
        }
        throw new IllegalArgumentException("Unknown tenant id: "+ value);
    }
}

