package eu.lundegaard.sdp.constants;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
public class SaFormConstants {
    public static final String EA_BLUR = "blur";
    public static final String EA_CLIPBOARD = "clipboard";
    public static final String EA_CONDITIONS_VIEW = "conditionsView";
    public static final String EA_FINISHED_FORM = "finishedForm";
    public static final String EA_FOCUS = "focus";
    public static final String EA_INPUT_CHANGE = "inputChange";
    public static final String EA_KEYSTROKES = "keystrokes";
    public static final String EA_SLIDER_MOVE = "sliderMove";
    public static final String EA_START_FILLING_FIELD = "startFillingField";
    public static final String EA_SUBMIT = "submit";
    public static final String EA_TERMS_CLOSE = "termsClose";
    public static final String EA_TERMS_OPEN = "termsOpen";

    public static final String EV_CLIPBOARD_COPY = "copy";
    public static final String EV_CLIPBOARD_CUT = "cut";
    public static final String EV_CLIPBOARD_PASTE = "paste";
    public static final String CLIPBOARD_COPY_PASTE_DIFFERENCE = "copy_paste_difference";
    public static final String NO_FIELD = "__no_field";

    public static final String EV_KEYSTROKE_BACKSPACE = "8";
    public static final String EV_KEYSTROKE_DELETE = "46";
    public static final String EV_KEYSTROKE_DOWN = "d";
    public static final String EV_KEYSTROKE_SHIFT = "16";
    public static final String EV_KEYSTROKE_UP = "u";

    public static final String EV_KEYSTROKE_REGEX = "(^[0-9]*)(d|u)(-?[0-9]*$)";
    public static final String EV_KEYSTROKES_SEPARATOR = "|";
    public static final String EV_KEYSTROKES_SEPARATOR_REGEX = "\\|";

    public static final String SUMMARY_STATS_AVG = "avg";
    public static final String SUMMARY_STATS_MAX = "max";
    public static final String SUMMARY_STATS_MED = "med";
    public static final String SUMMARY_STATS_MIN = "min";
    public static final String SUMMARY_STATS_STD = "std";
    public static final String SUMMARY_STATS_SUM = "sum";
}