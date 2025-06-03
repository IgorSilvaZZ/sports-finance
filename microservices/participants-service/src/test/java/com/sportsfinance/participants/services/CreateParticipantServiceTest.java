package com.sportsfinance.participants.services;

import com.sportsfinance.participants.dtos.CreateParticipantDTO;
import com.sportsfinance.participants.dtos.RecoveryParticipantsDTO;
import com.sportsfinance.participants.dtos.UpdateParticipantDTO;
import com.sportsfinance.participants.entities.Participant;
import com.sportsfinance.participants.exceptions.ParticipantAlreadyExists;
import com.sportsfinance.participants.mappers.ParticipantMapper;
import com.sportsfinance.participants.repositories.ParticipantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class CreateParticipantServiceTest {

    public static final String ID = "ID";
    public static final String NAME = "name";
    public static final String MAIL = "email@mail";
    public static final String PHONE_NUMBER = "phoneNumber";
    public static final String AVATAR = "avatar";
    public static final String EVENT_ID = "eventId";
    private Participant participant;
    private CreateParticipantDTO createParticipantDTO;
    private RecoveryParticipantsDTO recoveryParticipantsDTO;

    @InjectMocks
    private CreateParticipantService service;

    @Mock
    private ParticipantRepository repository;

    @Mock
    private ParticipantMapper mapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        this.startDomains();
    }

    @Test
    void whenCreateParticipantThenReturnAnParticipantResponse() {
        when(this.repository.findActiveParticipantByEventId(anyString(), anyString())).thenReturn(Optional.empty());
        when(this.repository.save(any())).thenReturn(this.participant);
        when(this.mapper.mapRecoveryParticipantDTO(any())).thenReturn(this.recoveryParticipantsDTO);

        RecoveryParticipantsDTO response = this.service.execute(this.createParticipantDTO);

        assertNotNull(response);
        assertEquals(RecoveryParticipantsDTO.class, response.getClass());
        verify(this.repository,times(1)).save(any());
    }

    @Test
    void whenCreateParticipantExistingThenThrowAnParticipantAlreadyExists() {
        when(this.repository.findActiveParticipantByEventId(anyString(), anyString())).thenReturn(Optional.ofNullable(this.participant));
        assertThrows(ParticipantAlreadyExists.class, () -> this.service.execute(this.createParticipantDTO));
    }

    void startDomains() {
        this.participant = new Participant(ID, NAME, MAIL, PHONE_NUMBER, AVATAR, EVENT_ID, null, LocalDate.now(), LocalDate.now());
        this.createParticipantDTO = new CreateParticipantDTO(NAME, EVENT_ID, MAIL, PHONE_NUMBER, AVATAR, null);
        this.recoveryParticipantsDTO = new RecoveryParticipantsDTO(ID, NAME, MAIL, PHONE_NUMBER, AVATAR, EVENT_ID, null, LocalDate.now(), LocalDate.now());
    }
}