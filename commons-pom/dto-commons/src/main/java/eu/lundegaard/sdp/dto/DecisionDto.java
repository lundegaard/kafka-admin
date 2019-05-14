package eu.lundegaard.sdp.dto;

import com.fasterxml.jackson.databind.node.ObjectNode;
import eu.lundegaard.sdp.commons.serialization.avro.encoders.AvroJsonEncoder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.avro.reflect.AvroEncode;

import javax.validation.constraints.NotNull;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DecisionDto {
    private String applicationId;
    @NotNull
    private Boolean decision;
    private String state;
    @AvroEncode(using = AvroJsonEncoder.class)
    private ObjectNode data;
    private Long t;
}
