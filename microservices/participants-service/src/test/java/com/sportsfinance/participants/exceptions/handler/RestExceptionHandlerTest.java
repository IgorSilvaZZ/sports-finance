package com.sportsfinance.participants.exceptions.handler;

import com.sportsfinance.participants.exceptions.model.ApiError;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class RestExceptionHandlerTest {

    @Mock
    private WebRequest webRequest;

    @InjectMocks
    private RestExceptionHandler handler;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void genericException() {
        Exception ex = new Exception("Throw Generic Excepetion");

        ResponseEntity<ApiError> response = this.handler.genericException(ex);

        assertEquals("Throw Generic Excepetion", response.getBody().errorMessage());
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("INTERNAL_SERVER_ERROR", response.getBody().typeError());
    }

    @Test
    void conflictException() {
        RuntimeException ex = new RuntimeException("Throw Conflict Exception");

        ResponseEntity<ApiError> response = this.handler.conflictException(ex);

        assertEquals("Throw Conflict Exception", response.getBody().errorMessage());
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("CONFLICT", response.getBody().typeError());
    }

    @Test
    void argumentNotValidException() {
        BindingResult bindingResult = mock(BindingResult.class);
        FieldError fieldError = new FieldError("objectName", "field", "Argument Not Valid Exception");

        MethodArgumentNotValidException ex =  mock(MethodArgumentNotValidException.class);
        when(ex.getBindingResult()).thenReturn(bindingResult);
        when(bindingResult.getFieldErrors()).thenReturn(List.of(fieldError));
        ResponseEntity<ApiError> response = this.handler.argumentNotValidException(ex);

        assertEquals("Argument Not Valid Exception", response.getBody().errorMessage());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("BAD_REQUEST", response.getBody().typeError());
    }
}