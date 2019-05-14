package eu.lundegaard.sdp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LabeledEventDto {
    /**
     * Event id
     */
    private String id;

    /**
     * Event label (prediction)
     */
    private Boolean label;

    /**
     * Probability of prediction
     */
    private Double probability;
}
