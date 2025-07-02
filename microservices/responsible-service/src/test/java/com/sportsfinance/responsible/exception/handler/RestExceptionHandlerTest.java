package com.sportsfinance.responsible.exception.handler;

import com.sportsfinance.responsible.exception.AlreadyExistsException;
import com.sportsfinance.responsible.exception.UnauthorizedException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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
    void runTimeException() {
        RuntimeException ex = new RuntimeException("Runtime error");
        when(webRequest.getDescription(false)).thenReturn("/some-path");

        ResponseEntity<RestErrorMessage> response = this.handler.runTimeException(ex, webRequest);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        RestErrorMessage body = response.getBody();
        assertNotNull(response.getBody());
        assertEquals("Runtime error", response.getBody().getMessage());
        assertEquals("RUNTIME_ERROR", response.getBody().getErrorCode());
        assertEquals("/some-path", response.getBody().getPath());
    }

    @Test
    void alreadyExistsException() {
        AlreadyExistsException ex = new AlreadyExistsException("Already Exists resource");
        when(webRequest.getDescription(false)).thenReturn("/some-path");

        ResponseEntity<RestErrorMessage> response = this.handler.alreadyExistsException(ex, webRequest);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        RestErrorMessage body = response.getBody();
        assertNotNull(response.getBody());
        assertEquals("Already Exists resource", response.getBody().getMessage());
        assertEquals("ALREADY_EXISTS_ERROR", response.getBody().getErrorCode());
        assertEquals("/some-path", response.getBody().getPath());
    }

    @Test
    void unauthorizedException() {
        UnauthorizedException ex = new UnauthorizedException("Unauthorized resource");
        when(webRequest.getDescription(false)).thenReturn("/some-path");

        ResponseEntity<RestErrorMessage> response = this.handler.unauthorizedException(ex, webRequest);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        RestErrorMessage body = response.getBody();
        assertNotNull(response.getBody());
        assertEquals("Unauthorized resource", response.getBody().getMessage());
        assertEquals("UNAUTHORIZED_ERROR", response.getBody().getErrorCode());
        assertEquals("/some-path", response.getBody().getPath());
    }

    @Test
    void methodArgumentNotValidException() {
        MethodArgumentNotValidException ex = mock(MethodArgumentNotValidException.class);
        HttpHeaders headers = new HttpHeaders();
        WebRequest webRequest = mock(WebRequest.class);
        BindingResult bindingResult = mock(BindingResult.class);

        when(bindingResult.getFieldErrors()).thenReturn(Arrays.asList(new FieldError("station", "name", "Should not be empty")));
        when(ex.getBindingResult()).thenReturn(bindingResult);
        when(webRequest.getDescription(false)).thenReturn("/some-path");

        ResponseEntity<RestErrorMessage> response = this.handler.methodArgumentNotValidException(ex, webRequest);

        RestErrorMessage body = response.getBody();
        assertEquals(HttpStatus.BAD_REQUEST, body.getStatus());
        assertNotNull(body);
        assertEquals("Should not be empty", body.getMessage());
        assertEquals("VALIDATION_ERROR", body.getErrorCode());
        assertEquals("/some-path", body.getPath());
    }
}