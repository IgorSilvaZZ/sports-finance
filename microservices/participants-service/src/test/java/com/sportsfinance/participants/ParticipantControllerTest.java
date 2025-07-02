package com.sportsfinance.participants;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sportsfinance.participants.dtos.CreateParticipantDTO;
import com.sportsfinance.participants.dtos.RecoveryParticipantsDTO;
import com.sportsfinance.participants.dtos.UpdateParticipantDTO;
import com.sportsfinance.participants.entities.Participant;
import com.sportsfinance.participants.exceptions.model.ApiError;
import com.sportsfinance.participants.services.CreateParticipantService;
import com.sportsfinance.participants.services.UpdateParticipantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class ParticipantControllerTest {

    public static final String ID = "ID";
    public static final String NAME = "name";
    public static final String MAIL = "email@mail";
    public static final String PHONE_NUMBER = "phoneNumber";
    public static final String AVATAR = "avatar";
    public static final String EVENT_ID = "eventId";
    private Participant participant;
    private CreateParticipantDTO createParticipantDTO;
    private UpdateParticipantDTO updateParticipantDTO;
    private RecoveryParticipantsDTO recoveryParticipantsDTO;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CreateParticipantService createParticipantService;

    @MockBean
    private UpdateParticipantService updateParticipantService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        this.startUser();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void whenCreateAnParticipantThenReturnSuccess() throws Exception {
        when(this.createParticipantService.execute(any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(post("/participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();

        RecoveryParticipantsDTO response = this.objectMapper.readValue(responseContent, RecoveryParticipantsDTO.class);

        assertNotNull(response);
        verify(this.createParticipantService, times(1)).execute(any());
    }

    @Test
    void whenCreateAnParticipantWithoutNameThenThrowAnBadRequestException() throws Exception {
        this.createParticipantDTO = new CreateParticipantDTO(null, EVENT_ID, MAIL, PHONE_NUMBER, AVATAR, null);
        when(this.createParticipantService.execute(any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(post("/participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O nome deve ser informado!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.createParticipantService, times(0)).execute(any());
    }

    @Test
    void whenCreateAnParticipantWithNameLessThen2CharShouldThrowAnBadRequestException() throws Exception {
        this.createParticipantDTO = new CreateParticipantDTO("A", EVENT_ID, MAIL, PHONE_NUMBER, AVATAR, null);
        when(this.createParticipantService.execute(any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(post("/participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O campo deve ter no mínimo 2 caracteres!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.createParticipantService, times(0)).execute(any());
    }

    @Test
    void whenCreateAnParticipantWithoutEventIdShouldThrowAnBadRequestException() throws Exception {
        this.createParticipantDTO = new CreateParticipantDTO(NAME, null, MAIL, PHONE_NUMBER, AVATAR, null);
        when(this.createParticipantService.execute(any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(post("/participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O ID do evento deve ser informado!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.createParticipantService, times(0)).execute(any());
    }

    @Test
    void whenCreateAnParticipantWithEmailInvalidShouldThrowAnBadRequestException() throws Exception {
        this.createParticipantDTO = new CreateParticipantDTO(NAME, EVENT_ID, "#.4@,.21%", PHONE_NUMBER, AVATAR, null);
        when(this.createParticipantService.execute(any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(post("/participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O e-mail deve ser válido!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.createParticipantService, times(0)).execute(any());
    }

    @Test
    void whenCreateAnParticipantWithoutPhoneNumberShouldThrowAnBadRequestException() throws Exception {
        this.createParticipantDTO = new CreateParticipantDTO(NAME, EVENT_ID, MAIL, null, AVATAR, null);
        when(this.createParticipantService.execute(any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(post("/participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O telefone deve ser informado!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.createParticipantService, times(0)).execute(any());
    }

    @Test
    void whenCreateAnParticipantWithPhoneNumberLessThen10CharShouldThrowAnBadRequestException() throws Exception {
        this.createParticipantDTO = new CreateParticipantDTO(NAME, EVENT_ID, MAIL, "123", AVATAR, null);
        when(this.createParticipantService.execute(any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(post("/participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O campo deve ter entre 10 e 14 caracteres!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.createParticipantService, times(0)).execute(any());
    }

    @Test
    void whenCreateAnParticipantWithPhoneNumberGreatherThen14CharShouldThrowAnBadRequestException() throws Exception {
        this.createParticipantDTO = new CreateParticipantDTO(NAME, EVENT_ID, MAIL, "0123456789101112", AVATAR, null);
        when(this.createParticipantService.execute(any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(post("/participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O campo deve ter entre 10 e 14 caracteres!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.createParticipantService, times(0)).execute(any());
    }

    @Test
    void whenUpdateParticipantByIdThenReturnAnParticipantUpdated() throws Exception {
        when(this.updateParticipantService.execute(anyString(), any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createParticipantDTO);
        String responseContent = this.mockMvc.perform(put("/participants/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        RecoveryParticipantsDTO response = this.objectMapper.readValue(responseContent, RecoveryParticipantsDTO.class);

        assertNotNull(response);
        verify(this.updateParticipantService, times(1)).execute(anyString(), any());
    }

    @Test
    void whenUpdateParticipantByIdWithNameLessThen2ChatShouldThrowAnBadRequestException() throws Exception {
        this.updateParticipantDTO = new UpdateParticipantDTO("A", MAIL, PHONE_NUMBER, AVATAR, null);
        when(this.updateParticipantService.execute(anyString(), any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.updateParticipantDTO);
        String responseContent = this.mockMvc.perform(put("/participants/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                    .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O campo deve ter no mínimo 2 caracteres!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.updateParticipantService, times(0)).execute(anyString(), any());
    }

    @Test
    void whenUpdateParticipantByIdWithEmaiInvalidShouldThrowAnBadRequestException() throws Exception {
        this.updateParticipantDTO = new UpdateParticipantDTO(NAME, "23$%5@980..,,49@", PHONE_NUMBER, AVATAR, null);
        when(this.updateParticipantService.execute(anyString(), any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.updateParticipantDTO);
        String responseContent = this.mockMvc.perform(put("/participants/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O e-mail deve ser válido!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.updateParticipantService, times(0)).execute(anyString(), any());
    }

    @Test
    void whenUpdateParticipantByIdWithPhoneNumberLessThen10CharShouldThrowAnBadRequestException() throws Exception {
        this.updateParticipantDTO = new UpdateParticipantDTO(NAME, MAIL, "123", AVATAR, null);
        when(this.updateParticipantService.execute(anyString(), any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.updateParticipantDTO);
        String responseContent = this.mockMvc.perform(put("/participants/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O campo deve ter entre 10 e 14 caracteres!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.updateParticipantService, times(0)).execute(anyString(), any());
    }

    @Test
    void whenUpdateParticipantByIdWithPhoneNumberGreatherThen14CharShouldThrowAnBadRequestException() throws Exception {
        this.updateParticipantDTO = new UpdateParticipantDTO(NAME, MAIL, "0123456789101112", AVATAR, null);
        when(this.updateParticipantService.execute(anyString(), any())).thenReturn(this.recoveryParticipantsDTO);
        String userJson = this.objectMapper.writeValueAsString(this.updateParticipantDTO);
        String responseContent = this.mockMvc.perform(put("/participants/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        ApiError response = this.objectMapper.readValue(responseContent, ApiError.class);

        assertEquals("O campo deve ter entre 10 e 14 caracteres!", response.errorMessage());
        assertEquals(400, response.statusCode());
        assertEquals("BAD_REQUEST", response.typeError());
        verify(this.updateParticipantService, times(0)).execute(anyString(), any());
    }

    void startUser(){
        this.participant = new Participant(ID, NAME, MAIL, PHONE_NUMBER, AVATAR, EVENT_ID, null, LocalDate.now(), LocalDate.now());
        this.createParticipantDTO = new CreateParticipantDTO(ID, EVENT_ID, MAIL, PHONE_NUMBER, AVATAR, null);
        this.updateParticipantDTO = new UpdateParticipantDTO(NAME, MAIL, PHONE_NUMBER, AVATAR, null);
        this.recoveryParticipantsDTO = new RecoveryParticipantsDTO(ID, NAME, MAIL, PHONE_NUMBER, AVATAR, EVENT_ID, null, LocalDate.now(), LocalDate.now());
    }
}