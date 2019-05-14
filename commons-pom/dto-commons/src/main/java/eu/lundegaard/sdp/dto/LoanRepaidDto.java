package eu.lundegaard.sdp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LoanRepaidDto {
    private String applicationId;
    @NotNull
    private Boolean repaid;
}
