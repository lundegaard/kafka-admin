package eu.lundegaard.sdp.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Jozef Krcho (jozef.krcho@lundegaard.eu)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaPageEventDto {

    /**
     * Message version
     */
    private String mv;

    /**
     * Event type
     */
    private String et;

    /**
     * URL
     */
    private String url;

    /**
     * IP address
     */
    private String ip;

    /**
     * Browser
     */
    private String br;

    /**
     * Screen size width
     */
    private String ssw;

    /**
     * Screen size height
     */
    private String ssh;

    /**
     * Viewport size width
     */
    private String vsw;

    /**
     * Viewport size height
     */
    private String vsh;

    /**
     * Color depth
     */
    private String cd;

    /**
     * Character set
     */
    private String ch;

    /**
     * Preferred language
     */
    private String lng;

    /**
     * Java Enabled
     */
    private String je;

    /**
     * Send time in milliseconds
     */
    private Long t;

    /**
     * Event time in milliseconds
     */
    private Long eventTime;

    /**
     * Event time in milliseconds
     */
    private Long ingestionTime;

    /**
     * referrer
     */
    private String r;

    /**
     * User ID (ApiVersion.RandomId.Timestamp_of_first_visit)
     */
    private String sa;

    /**
     * Session ID (ApiVersion.RandomId.Timestamp_of_session_start)
     */
    private String said;

    /**
     * Client ID
     */
    private String cid;

    /**
     * Tracker ID
     */
    private String tid;

    private String doNotTrackEnabled;

    @JsonProperty("fv")
    private String flashVersion;

    @JsonProperty("tz")
    private String timezone;

    @JsonProperty("ce")
    private String cookiesEnabled;

    private String userAgent;

    //=========================================================
    //Derived fields
    //=========================================================
    private String lngCode;

    private String screenResolution;

    private String urlPath;

    private String browserType;

    private String deviceCategory;

    private String deviceName;

    private String deviceBrand;

    private String deviceVersion;

    private String operatingSystem;

    private String operatingSystemVersion;

    private String deviceCpu;

    private String viewportOrientation;

    //=========================================================
    //Helper getters
    //=========================================================

    @JsonIgnore
    public String getEventType() {
        return et;
    }

    @JsonIgnore
    public String getBrowser() {
        return br;
    }

    @JsonIgnore
    public String getScreenSizeWidth() {
        return ssw;
    }

    @JsonIgnore
    public String getScreenSizeHeight() {
        return ssh;
    }

    @JsonIgnore
    public String getViewportSizeWidth() {
        return vsw;
    }

    @JsonIgnore
    public String getViewSizeHeight() {
        return vsh;
    }

    @JsonIgnore
    public String getColorDepth() {
        return cd;
    }

    @JsonIgnore
    public String getCharacterSet() {
        return ch;
    }

    @JsonIgnore
    public String getPreferedLanguage() {
        return lng;
    }

    @JsonIgnore
    public String getJavaEnabled() {
        return je;
    }

    @JsonIgnore
    public long getTimestamp() {
        return t;
    }

    @JsonIgnore
    public String getRefferer() {
        return r;
    }

    @JsonIgnore
    public String getUserID() {
        return sa;
    }

    @JsonIgnore
    public String getSessionID() {
        return said;
    }

    @JsonIgnore
    public String getClientID() {
        return cid;
    }

    @JsonIgnore
    public String getTrackerID() {
        return tid;
    }

    @JsonIgnore
    public String getLanguageCode() {
        return this.lngCode;
    }
}
