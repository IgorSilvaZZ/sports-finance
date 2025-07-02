package com.sportsfinance.responsible.config.security;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.sportsfinance.responsible.api.dto.AuthenticateResponsibleDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class TokenServiceTest {

    private final TokenService tokenService = new TokenService();

    @Test
    void whenGenerateTokenThenReturnAnToken() throws NoSuchFieldException, IllegalAccessException {
        this.tokenService.setSecret("secret-test");
        String token = this.tokenService.generateToken(new AuthenticateResponsibleDTO("email@mail", "password"));
        assertNotNull(token);
    }

    @Test
    void whenGenerateTokenThenThrowAnJWTCreationException() {
        try {
            this.tokenService.generateToken(new AuthenticateResponsibleDTO("email@mail", "password"));
            fail();
        } catch (Exception ex) {
            assertEquals(RuntimeException.class, ex.getClass());
            assertEquals("Error while generation token", ex.getMessage());
        }
    }
}