package com.sportsfinance.responsible.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sportsfinance.responsible.api.dto.AuthenticateResponsibleDTO;
import com.sportsfinance.responsible.api.dto.CreateResponsibleDTO;
import com.sportsfinance.responsible.api.dto.ResponsibleLoginDTO;
import com.sportsfinance.responsible.config.security.PasswordEncrypt;
import com.sportsfinance.responsible.config.security.TokenService;
import com.sportsfinance.responsible.domain.model.Responsible;
import com.sportsfinance.responsible.domain.service.ResponsibleService;
import com.sportsfinance.responsible.exception.handler.RestErrorMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ResponsibleControllerTest {

    public static final String NAME = "name";
    public static final String MAIL = "mail@mail";
    public static final String PASSWORD_FAKE = "password";
    public static final String PASSWORD_ENCRYPT = PasswordEncrypt.encoder(PASSWORD_FAKE);
    public static final String PHONE = "phone";
    public static final String AVATAR = "avatar";
    public static final long ID = 1L;

    private AuthenticateResponsibleDTO authenticateResponsibleDTO;
    private CreateResponsibleDTO createResponsibleDTO;
    private Responsible responsible;

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private ResponsibleController responsibleController;

    @MockBean
    private ResponsibleService responsibleService;

    @MockBean
    private TokenService tokenService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        this.startUser();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void whenCreateResponsibleThenReturnSuccess() throws Exception {
        when(this.responsibleService.createResponsible(any())).thenReturn(this.createResponsibleDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createResponsibleDTO);
        String responseContent = mockMvc.perform(post("/responsible/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        CreateResponsibleDTO response = this.objectMapper.readValue(responseContent, CreateResponsibleDTO.class);

        assertNotNull(response);
        verify(this.responsibleService, times(1)).createResponsible(any());
    }

    @Test
    void whenCreateResponsibleWithNameNullThenThrowAnBadRequestException() throws Exception {
        this.createResponsibleDTO.setName(null);
        String userJson = this.objectMapper.writeValueAsString(this.createResponsibleDTO);
        String responseContent = mockMvc.perform(post("/responsible/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Um Nome precisa ser informado.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/responsible/create", response.getPath());
        verify(this.responsibleService, times(0)).createResponsible(any());
    }

    @Test
    void whenCreateResponsibleWithMailNullThenThrowAnBadRequestException() throws Exception {
        this.createResponsibleDTO.setEmail(null);
        String userJson = this.objectMapper.writeValueAsString(this.createResponsibleDTO);
        String responseContent = mockMvc.perform(post("/responsible/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Um email válido precisa ser informado.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/responsible/create", response.getPath());
        verify(this.responsibleService, times(0)).createResponsible(any());
    }

    @Test
    void whenCreateResponsibleWithMailIrregularThenThrowAnBadRequestException() throws Exception {
        this.createResponsibleDTO.setEmail("mail#123,");
        String userJson = this.objectMapper.writeValueAsString(this.createResponsibleDTO);
        String responseContent = mockMvc.perform(post("/responsible/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("O email informado não está no padrão de emails esperados.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/responsible/create", response.getPath());
        verify(this.responsibleService, times(0)).createResponsible(any());
    }

    @Test
    void whenCreateResponsibleWithPasswordNullThenThrowAnBadRequestException() throws Exception {
        this.createResponsibleDTO.setPassword(null);
        String userJson = this.objectMapper.writeValueAsString(this.createResponsibleDTO);
        String responseContent = mockMvc.perform(post("/responsible/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Uma senha precisa ser informada.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/responsible/create", response.getPath());
        verify(this.responsibleService, times(0)).createResponsible(any());
    }

    @Test
    void whenAuthenticateResponsibleThenReturnSuccess() throws Exception {
        when(this.responsibleService.authenticateResponsible(any())).thenReturn(this.authenticateResponsibleDTO);
        this.tokenService.setSecret("default");
        String userJson = this.objectMapper.writeValueAsString(this.authenticateResponsibleDTO);
        String responseContent = mockMvc.perform(post("/responsible/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        ResponsibleLoginDTO response = this.objectMapper.readValue(responseContent, ResponsibleLoginDTO.class);

        assertNotNull(response);
        verify(this.responsibleService, times(1)).authenticateResponsible(any());
        verify(this.tokenService, times(1)).generateToken(any());
    }

    private void startUser() {
        this.authenticateResponsibleDTO = new AuthenticateResponsibleDTO(MAIL, PASSWORD_FAKE);
        this.createResponsibleDTO = new CreateResponsibleDTO(NAME, MAIL, PASSWORD_FAKE, PHONE, AVATAR);
        this.responsible = new Responsible(ID, NAME, MAIL, PASSWORD_ENCRYPT, PHONE, AVATAR, LocalDate.now(), LocalDate.now());
    }
}