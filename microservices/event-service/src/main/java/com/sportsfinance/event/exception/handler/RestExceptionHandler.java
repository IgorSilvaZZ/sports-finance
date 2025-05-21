package com.sportsfinance.event.exception.handler;

import com.sportsfinance.event.exception.EventNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<RestErrorMessage> runTimeException(RuntimeException exception, WebRequest request) {
        String timestamp = LocalDateTime.now().toString();
        String path = request.getDescription(false).replace("uri=", "");
        String errorCode = "RUNTIME_ERROR";

        RestErrorMessage errorMessage = new RestErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR,
                exception.getMessage(),
                timestamp,
                path,
                errorCode
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }

    @ExceptionHandler(EventNotFoundException.class)
    protected ResponseEntity<RestErrorMessage> eventNotFoundException(EventNotFoundException exception, WebRequest request) {
        String timestamp = LocalDateTime.now().toString();
        String path = request.getDescription(false).replace("uri=", "");
        String errorCode = "EVENT_NOT_FOUND";

        RestErrorMessage errorMessage = new RestErrorMessage(
                HttpStatus.NOT_FOUND,
                exception.getMessage(),
                timestamp,
                path,
                errorCode
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

}
