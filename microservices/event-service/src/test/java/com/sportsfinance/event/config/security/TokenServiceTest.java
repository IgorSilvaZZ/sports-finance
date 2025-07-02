package com.sportsfinance.event.config.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class TokenServiceTest {

    private String token;
    private final TokenService tokenService = new TokenService();

    @BeforeEach
    void setUp() {
        this.generateTokenTest();
    }

    @Test
    void whenValidateTokenThenReturnTrue() {
        this.tokenService.setSecret("secret-test");
        boolean valid = this.tokenService.validateToken(this.token);
        assertTrue(valid);
    }

    @Test
    void whenValidateTokenThenReturnFalse() {
        this.tokenService.setSecret("secret-tests");
        boolean valid = this.tokenService.validateToken(this.token);
        assertFalse(valid);
    }

    private void generateTokenTest() {
        Algorithm algorithm = Algorithm.HMAC256("secret-test");
        this.token = JWT.create()
                .withIssuer("sports-finance-auth")
                .withSubject("email@teste.com")
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600))
                .sign(algorithm);
    }
}