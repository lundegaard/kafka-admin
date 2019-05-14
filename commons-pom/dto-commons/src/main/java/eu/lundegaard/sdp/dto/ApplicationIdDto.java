package eu.lundegaard.sdp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ApplicationIdDto {
    @Valid
    @NotNull
    private UserInfoDto userInfo;
    @Size(min = 8, max = 64)
    @NotNull
    private String applicationId;
    /**
     * Send time in milliseconds
     */
    private Long t;
}
