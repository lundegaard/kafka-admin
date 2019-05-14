package eu.lundegaard.sdp.commons.serialization;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;

/**
 * JSON deserializer which converts incoming String to ObjectNode
 */
public class ObjectNodeDeserializer extends com.fasterxml.jackson.databind.JsonDeserializer<ObjectNode> {
    @Override
    public ObjectNode deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        switch (p.currentToken()) {
            case VALUE_STRING:
                String json = p.getValueAsString();
                return JsonUtil.fromJson(json, ObjectNode.class);
            default:
                ctxt.reportWrongTokenException(this, p.currentToken(), "JSON element is not VALUE_STRING");
                return null;
        }
    }
}
