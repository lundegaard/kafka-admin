package eu.lundegaard.sdp.commons.serialization.avro.encoders;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.avro.reflect.AvroEncode;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Dummy {
    private String name;
    @AvroEncode(using = AvroMapEncoder.class)
    private Map<String, Integer> keys;
    @AvroEncode(using = AvroJsonEncoder.class)
    private ObjectNode json;
}
