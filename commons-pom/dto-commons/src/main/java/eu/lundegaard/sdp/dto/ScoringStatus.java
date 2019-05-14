package eu.lundegaard.sdp.dto;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
public enum ScoringStatus {
    PROCESSING,
    SCORED,
    REJECTED,
    ERROR;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
