package eu.lundegaard.sdp.commons.serialization;

import io.confluent.kafka.schemaregistry.client.rest.exceptions.RestClientException;
import org.apache.avro.Schema;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.io.DatumReader;

import java.io.IOException;

public class GenericRecordDeserializer extends AbstractAvroDeserializer {
    @Override
    protected DatumReader<Object> getReader(int schemaId) throws IOException, RestClientException {
        Schema writer = schemaRegistry.getById(schemaId);
        return new GenericDatumReader<>(writer);
    }
}
