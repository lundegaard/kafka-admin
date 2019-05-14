package eu.lundegaard.sdp.commons.serialization;

import eu.lundegaard.commons.exception.ApplicationException;

/**
 * Thrown when JSON conversion/(de)serialization fails.
 */
public class ConversionException extends ApplicationException {
    public ConversionException(String message) {
        super(message);
    }

    public ConversionException(Throwable cause) {
        super(cause);
    }

    public ConversionException(String message, Throwable cause) {
        super(message, cause);
    }
}
