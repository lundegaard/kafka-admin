package eu.lundegaard.sdp.commons.serialization.avro.encoders;

import eu.lundegaard.sdp.commons.serialization.JsonUtil;
import org.apache.avro.Schema;
import org.apache.avro.io.Decoder;
import org.apache.avro.io.Encoder;
import org.apache.avro.reflect.CustomEncoding;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

/**
 * Custom encoding for serializing Map through JSON.
 */
public class AvroMapEncoder extends CustomEncoding<Map> {
    private static final int NULL_INDEX = 0;
    private static final int JSON_INDEX = 1;

    public AvroMapEncoder() {
        this.schema = Schema.createUnion(
                Arrays.asList(Schema.create(Schema.Type.NULL), Schema.create(Schema.Type.STRING))
        );
    }

    @Override
    protected void write(Object datum, Encoder out) throws IOException {
        if (datum == null) {
            out.writeIndex(NULL_INDEX);
            out.writeNull();
        } else {
            out.writeIndex(JSON_INDEX);
            out.writeString(JsonUtil.toJson(datum));
        }
    }

    @Override
    protected Map read(Object reuse, Decoder in) throws IOException {
        int i = in.readIndex();
        switch (i) {
            case JSON_INDEX:
                String json = in.readString();
                return JsonUtil.fromJson(json, Map.class);
            default:
                return null;
        }
    }
}
