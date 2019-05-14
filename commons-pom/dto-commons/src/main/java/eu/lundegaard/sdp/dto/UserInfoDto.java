package eu.lundegaard.sdp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserInfoDto {
    private String sa;
    @Size(min = 8)
    private String said;
    private String pi;
    private String cid;
    @NotNull
    private String tid;
}
