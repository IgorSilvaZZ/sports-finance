package com.sportsfinance.event.api.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.sportsfinance.event.api.dto.CreateEventDTO;
import com.sportsfinance.event.api.dto.EventResponseDTO;
import com.sportsfinance.event.api.dto.EventUpdateDTO;
import com.sportsfinance.event.config.security.TokenService;
import com.sportsfinance.event.domain.model.EventTypeEnum;
import com.sportsfinance.event.domain.service.EventService;
import com.sportsfinance.event.exception.EventNotFoundException;
import com.sportsfinance.event.exception.handler.RestErrorMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTest {

    @Value("${api.security.token.secret}")
    private String secret;
    private String token;

    public static final String ID = "ID";
    public static final String NAME = "eventName";
    public static final String EVENT_DESC = "eventDesc";
    public static final EventTypeEnum EVENT_TYPE_ENUM = EventTypeEnum.OTHER;
    public static final double VALUE_MONTHLY = 40.0;
    public static final String DAY_MONTHLY = "01";
    public static final String RESPONSIBLE_ID = "ResponsibleId";
    public static final LocalDateTime NOW = LocalDateTime.now();
    public static final String EVENT_NOT_FOUND = "Event not found.";

    private CreateEventDTO createEventDTO;
    private EventUpdateDTO eventUpdateDTO;
    private EventResponseDTO eventResponseDTO;

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private EventController controller;

    @MockBean
    private UserDetailsService userDetailsService;

    @MockBean
    private EventService service;

    @MockBean
    private TokenService tokenService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        this.startUser();
        this.generateTokenTest();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void whenCreateEventThenReturnSuccess() throws Exception {
        when(this.tokenService.validateToken(any())).thenReturn(true);
        when(this.service.createEvent(any())).thenReturn(this.eventResponseDTO);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(post("/event/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        EventResponseDTO response = this.objectMapper.readValue(responseContent, EventResponseDTO.class);

        assertNotNull(response);
        verify(this.service, times(1)).createEvent(any());
    }

    @Test
    void whenCreateEventWithoutTokenThenReturnAnForbidden403Error() throws Exception {
        this.mockMvc.perform(post("/event/"))
                .andExpect(status().isForbidden()).andReturn().getResponse().getContentAsString();
        verify(this.service, times(0)).createEvent(any());

    }

    @Test
    void whenCreateEventWithoutNameThenReturnAnBadRequestException() throws Exception {
        when(this.tokenService.validateToken(any())).thenReturn(true);
        this.createEventDTO.setName(null);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(post("/event/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Um Nome precisa ser informado.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/event/", response.getPath());
        verify(this.service, times(0)).createEvent(any());
    }

    @Test
    void whenCreateEventWithoutDescriptionThenReturnAnBadRequestException() throws Exception {
        when(this.tokenService.validateToken(any())).thenReturn(true);
        this.createEventDTO.setDescription(null);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(post("/event/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Deve ser informada uma descrição para o evento.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/event/", response.getPath());
        verify(this.service, times(0)).createEvent(any());
    }

    @Test
    void whenCreateEventWithoutTypeThenReturnAnBadRequestException() throws Exception {
        when(this.tokenService.validateToken(any())).thenReturn(true);
        this.createEventDTO.setType(null);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(post("/event/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("O Tipo de evento deve ser informado.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/event/", response.getPath());
        verify(this.service, times(0)).createEvent(any());
    }

    @Test
    void whenCreateEventWithoutValueMonthlyThenReturnAnBadRequestException() throws Exception {
        when(this.tokenService.validateToken(any())).thenReturn(true);
        this.createEventDTO.setValueMonthly(null);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(post("/event/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("É necessário um Valor Mensal para o evento.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/event/", response.getPath());
        verify(this.service, times(0)).createEvent(any());
    }

    @Test
    void whenCreateEventWithoutDayMonthlyThenReturnAnBadRequestException() throws Exception {
        when(this.tokenService.validateToken(any())).thenReturn(true);
        this.createEventDTO.setValueMonthly(null);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(post("/event/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("É necessário um Valor Mensal para o evento.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/event/", response.getPath());
        verify(this.service, times(0)).createEvent(any());
    }

    @Test
    void whenCreateEventWithoutResponsibleIdThenReturnAnBadRequestException() throws Exception {
        when(this.tokenService.validateToken(any())).thenReturn(true);
        this.createEventDTO.setResponsibleId(null);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(post("/event/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isBadRequest()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Precisa ser informado o ID do Responsável.", response.getMessage());
        assertEquals("VALIDATION_ERROR", response.getErrorCode());
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatus());
        assertEquals("/event/", response.getPath());
        verify(this.service, times(0)).createEvent(any());
    }

    @Test
    void whenFindEventByIdThenReturnAnEvent() throws Exception {
        when(this.service.findEventById(anyString())).thenReturn(this.eventResponseDTO);
        when(this.tokenService.validateToken(any())).thenReturn(true);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(get("/event/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        EventResponseDTO response = this.objectMapper.readValue(responseContent, EventResponseDTO.class);

        assertNotNull(response);
        verify(this.service, times(1)).findEventById(any());
    }

    @Test
    void whenFindEventByIdThenReturnAnForbidden403Error() throws Exception {
        this.mockMvc.perform(get("/event/1"))
                .andExpect(status().isForbidden()).andReturn().getResponse().getContentAsString();
        verify(this.service, times(0)).findEventById(any());
    }

    @Test
    void whenFindEventByIdThenReturnAnNotFoundException() throws Exception {
        when(this.service.findEventById(anyString())).thenThrow(new EventNotFoundException("Event not found."));
        when(this.tokenService.validateToken(any())).thenReturn(true);
        String userJson = this.objectMapper.writeValueAsString(this.createEventDTO);
        String responseContent = this.mockMvc.perform(get("/event/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isNotFound()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Event not found.", response.getMessage());
        assertEquals("EVENT_NOT_FOUND", response.getErrorCode());
        assertEquals(HttpStatus.NOT_FOUND, response.getStatus());
        assertEquals("/event/1", response.getPath());
        verify(this.service, times(1)).findEventById(any());
    }

    @Test
    void whenFindEventsByResponsibleThenReturnAnListOfEventsFiltredByResponsible() throws Exception {
        when(this.service.findEventsByResponsibleId(anyString())).thenReturn(List.of(this.eventResponseDTO));
        when(this.tokenService.validateToken(any())).thenReturn(true);
        String responseContent = this.mockMvc.perform(get("/event/responsible/1")
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        List<EventResponseDTO> response = this.objectMapper.readValue(responseContent, new TypeReference<>() {
        });
        assertNotNull(response);
        verify(this.service, times(1)).findEventsByResponsibleId(any());
    }

    @Test
    void whenFindEventsByResponsibleThenReturnAn403ForbiddenError() throws Exception {
        this.mockMvc.perform(get("/event/responsible/1"))
                .andExpect(status().isForbidden()).andReturn().getResponse().getContentAsString();
        verify(this.service, times(0)).findEventsByResponsibleId(any());
    }

    @Test
    void whenFindEventsByResponsibleThenReturnAnNotFoundException() throws Exception {
        when(this.service.findEventsByResponsibleId(anyString())).thenThrow(new EventNotFoundException("Event not found."));
        ;
        when(this.tokenService.validateToken(any())).thenReturn(true);
        String responseContent = this.mockMvc.perform(get("/event/responsible/1")
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isNotFound()).andReturn().getResponse().getContentAsString();
        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Event not found.", response.getMessage());
        assertEquals("EVENT_NOT_FOUND", response.getErrorCode());
        assertEquals(HttpStatus.NOT_FOUND, response.getStatus());
        assertEquals("/event/responsible/1", response.getPath());
        verify(this.service, times(1)).findEventsByResponsibleId(any());
    }

    @Test
    void whenUpdateEventThenReturnAnEventUpdated() throws Exception {
        when(this.service.updateEvent(anyString(), any())).thenReturn(this.eventResponseDTO);
        when(this.tokenService.validateToken(any())).thenReturn(true);
        String userJson = this.objectMapper.writeValueAsString(this.eventUpdateDTO);
        String responseContent = this.mockMvc.perform(put("/event/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        EventResponseDTO response = this.objectMapper.readValue(responseContent, EventResponseDTO.class);

        assertNotNull(response);
        verify(this.service, times(1)).updateEvent(anyString(), any());
    }

    @Test
    void whenUpdateEventThenReturnAn403ForbiddenError() throws Exception {
        this.mockMvc.perform(get("/event/1"))
                .andExpect(status().isForbidden()).andReturn().getResponse().getContentAsString();
        verify(this.service, times(0)).updateEvent(anyString(), any());
    }

    @Test
    void whenUpdateEventThenReturnAnNotFoundException() throws Exception {
        when(this.service.updateEvent(anyString(), any())).thenThrow(new EventNotFoundException("Event not found."));
        when(this.tokenService.validateToken(any())).thenReturn(true);
        String userJson = this.objectMapper.writeValueAsString(this.eventUpdateDTO);
        String responseContent = this.mockMvc.perform(put("/event/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isNotFound()).andReturn().getResponse().getContentAsString();

        RestErrorMessage response = this.objectMapper.readValue(responseContent, RestErrorMessage.class);

        assertEquals("Event not found.", response.getMessage());
        assertEquals("EVENT_NOT_FOUND", response.getErrorCode());
        assertEquals(HttpStatus.NOT_FOUND, response.getStatus());
        assertEquals("/event/1", response.getPath());
        verify(this.service, times(1)).updateEvent(anyString(), any());
    }

    @Test
    void whenDeleteEventThenReturnSuccess() throws Exception {
        when(this.tokenService.validateToken(any())).thenReturn(true);
        this.mockMvc.perform(delete("/event/1")
                        .header("Authorization", "Bearer " + this.token))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        verify(this.service, times(1)).deleteEvent(anyString());
    }

    @Test
    void whenDeleteEventThenReturnAn403ForbiddenError() throws Exception {
        String responseContent = this.mockMvc.perform(delete("/event/1"))
                .andExpect(status().isForbidden()).andReturn().getResponse().getContentAsString();
        verify(this.service, times(0)).deleteEvent(anyString());
    }

    private void startUser() {
        this.createEventDTO = new CreateEventDTO(NAME, EVENT_DESC, EVENT_TYPE_ENUM, VALUE_MONTHLY, DAY_MONTHLY, RESPONSIBLE_ID);
        this.eventUpdateDTO = new EventUpdateDTO(NAME, EVENT_DESC, EVENT_TYPE_ENUM, VALUE_MONTHLY, DAY_MONTHLY, RESPONSIBLE_ID, NOW);
        this.eventResponseDTO = new EventResponseDTO(ID, NAME, EVENT_DESC, EVENT_TYPE_ENUM, VALUE_MONTHLY, DAY_MONTHLY, RESPONSIBLE_ID);
    }

    private void generateTokenTest() {
        Algorithm algorithm = Algorithm.HMAC256(this.secret);
        this.token = JWT.create()
                .withIssuer("sports-finance-auth")
                .withSubject("email@teste.com")
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600))
                .sign(algorithm);
    }

}