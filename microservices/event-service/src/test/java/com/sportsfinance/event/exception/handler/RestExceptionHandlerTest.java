package com.sportsfinance.event.exception.handler;

import com.sportsfinance.event.exception.EventNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

import static org.junit.jupiter.api.Assertions.*;
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
        assertNotNull(response.getBody());
        assertEquals("Runtime error", response.getBody().getMessage());
        assertEquals("RUNTIME_ERROR", response.getBody().getErrorCode());
        assertEquals("/some-path", response.getBody().getPath());
    }

    @Test
    void eventNotFound() {
        EventNotFoundException ex = new EventNotFoundException("Event Not Found");
        when(webRequest.getDescription(false)).thenReturn("/some-path");

        ResponseEntity<RestErrorMessage> response = this.handler.eventNotFoundException(ex, webRequest);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Event Not Found", response.getBody().getMessage());
        assertEquals("EVENT_NOT_FOUND", response.getBody().getErrorCode());
        assertEquals("/some-path", response.getBody().getPath());
    }
}