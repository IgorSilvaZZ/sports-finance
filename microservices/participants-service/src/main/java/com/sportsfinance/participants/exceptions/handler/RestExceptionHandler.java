package com.sportfinances.participants.exceptions.handler;

import com.sportfinances.participants.exceptions.ParticipantAlreadyExists;
import com.sportfinances.participants.exceptions.model.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

// RestControllerAdvice => Tratar as exceções de maneira global
@RestControllerAdvice
public class RestExceptionHandler {

    // Definindo o logger da classe
    Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);

    // ExceptionHandler => Manusear exceções especificas

    // Dizendo que todas as ações relacionadas ao internal server errror (erros internos genericos)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> genericException(Exception ex) {
        ApiError apiError = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .typeError(HttpStatus.INTERNAL_SERVER_ERROR.name())
                .errorMessage(ex.getMessage())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({
            ParticipantAlreadyExists.class
    })
    public ResponseEntity<ApiError> conflictException(RuntimeException ex) {
        ApiError apiError = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .statusCode(HttpStatus.CONFLICT.value())
                .typeError(HttpStatus.CONFLICT.name())
                .errorMessage(ex.getMessage())
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.CONFLICT);
    }

    // Dizendo que as validações de request body que falharem vão ser coletadas aqui
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> argumentNotValidException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();

        ApiError apiError = ApiError.builder()
                .timestamp(LocalDateTime.now())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .typeError(HttpStatus.BAD_REQUEST.name())
                .errorMessage(errorMessage)
                .build();

        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);

    }

}
