package eu.lundegaard.sdp.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

/**
 * @author Milan Hruban (milan.hruban@lundegaard.eu)
 */
@RestControllerAdvice
public class DefaultExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public ResponseEntity<?> handleNoDataFound(Throwable ex) {
        return null;
    }
}
