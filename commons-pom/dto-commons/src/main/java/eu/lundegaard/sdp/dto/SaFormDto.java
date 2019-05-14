package eu.lundegaard.sdp.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class SaFormDto extends SaPageEventDto {

    /**
     * Unique hash for page instance, each reload gives unique hash
     */
    private String pi;

    /**
     * Event Action. E.g. Play, focus.
     */
    private String ea;

    /**
     * String relevant for eventAction.
     */
    private String ev;

    /**
     * Custom string data value for event.
     */
    private String dim1;

    /**
     * Custom string data value for event.
     */
    private String dim2;

    /**
     * Custom string data value for event.
     */
    private String dim3;

    /**
     * Custom string data value for event.
     */
    private String dim4;

    //=========================================================
    //Derived fields
    //=========================================================

    //=========================================================
    //Helper getters
    //=========================================================

    @JsonIgnore
    public String getPageInstance() {
        return pi;
    }

    @JsonIgnore
    public String getEventAction() {
        return ea;
    }

    @JsonIgnore
    public String getEventValue() {
        return ev;
    }

    @JsonIgnore
    public String getFormId() {
        return dim1;
    }
}
