package eu.lundegaard.sdp.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Lukas Matejka (lukas.matejka@lundegaard.eu)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SApmFrontEndDto extends SaPageEventDto {

    /**
     * Event Action. E.g. Play, focus. Required.
     */
    private String ea;

    /**
     * String relevant for eventAction.
     */
    private String ev;
    /**
     * Unique hash for page instance, each reload gives unique hash
     */
    private String pi;

    //=========================================================
    //Derived fields
    //=========================================================

    /**
     * Duration of page render
     */
    /**
     * TODO This is numeric value and should be stored as Long but since this dto is used in input topic
     * s_apm_frontend_event and this schema change is not backwards compatible, it would result in errors
     * When performing this change, input topic has to be manually migrated to new schema
     */
    private String d;

    //=========================================================
    //Helper getters
    //=========================================================

    @JsonIgnore
    public String getEventAction() {
        return ea;
    }

    @JsonIgnore
    public String getEventValue() {
        return ev;
    }

    @JsonIgnore
    public String getPageInstance() {
        return pi;
    }

    @JsonIgnore
    public String getDuration() {
        return d;
    }
}

