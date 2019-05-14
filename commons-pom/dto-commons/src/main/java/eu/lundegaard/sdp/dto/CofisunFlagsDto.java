package eu.lundegaard.sdp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CofisunFlagsDto {
    private Long id;
    @NotNull
    private String birthNumber;
    @NotNull
    private Long t;
    @NotNull
    private Integer applicationStatus;
    private Integer fraudDetected;
    private Integer earlyRepayment;
    private Integer default3;
    private Integer default6;
    private Integer default9;
    private Integer default12;
    private Integer rbp;
    private Long epoch;
    private String productId;
    private String transactionId;
}
