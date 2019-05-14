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
public class SaFormDecisionDto extends SaFormDto {

    /**
     * Event decision
     */
    private String decision;
}
