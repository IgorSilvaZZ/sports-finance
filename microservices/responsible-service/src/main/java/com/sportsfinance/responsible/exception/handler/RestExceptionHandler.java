package com.sportsfinance.responsible.exception.handler;

import com.sportsfinance.responsible.exception.AlreadyExistsException;
import com.sportsfinance.responsible.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
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

    @ExceptionHandler(AlreadyExistsException.class)
    protected ResponseEntity<RestErrorMessage> alreadyExistsException(AlreadyExistsException exception, WebRequest request) {
        String timestamp = LocalDateTime.now().toString();
        String path = request.getDescription(false).replace("uri=", "");
        String errorCode = "ALREADY_EXISTS_ERROR";
        RestErrorMessage errorMessage = new RestErrorMessage(
                HttpStatus.CONFLICT,
                exception.getMessage(),
                timestamp,
                path,
                errorCode
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }

    @ExceptionHandler(UnauthorizedException.class)
    protected ResponseEntity<RestErrorMessage> unauthorizedException(UnauthorizedException exception, WebRequest request) {
        String timestamp = LocalDateTime.now().toString();
        String path = request.getDescription(false).replace("uri=", "");
        String errorCode = "UNAUTHORIZED_ERROR";
        RestErrorMessage errorMessage = new RestErrorMessage(
                HttpStatus.UNAUTHORIZED,
                exception.getMessage(),
                timestamp,
                path,
                errorCode
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<RestErrorMessage> methodArgumentNotValidException(MethodArgumentNotValidException exception, WebRequest request) {
        String timestamp = LocalDateTime.now().toString();
        String path = request.getDescription(false).replace("uri=", "");
        String errorCode = "VALIDATION_ERROR";
        String message = exception.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
        RestErrorMessage errorMessage = new RestErrorMessage(
                HttpStatus.BAD_REQUEST,
                message,
                timestamp,
                path,
                errorCode
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }
}
