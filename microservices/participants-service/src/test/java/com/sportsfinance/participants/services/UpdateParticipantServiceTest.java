package com.sportsfinance.participants.services;

import com.sportsfinance.participants.dtos.CreateParticipantDTO;
import com.sportsfinance.participants.dtos.RecoveryParticipantsDTO;
import com.sportsfinance.participants.dtos.UpdateParticipantDTO;
import com.sportsfinance.participants.entities.Participant;
import com.sportsfinance.participants.exceptions.ParticipantNotFound;
import com.sportsfinance.participants.mappers.ParticipantMapper;
import com.sportsfinance.participants.repositories.ParticipantRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class UpdateParticipantServiceTest {

    public static final String ID = "ID";
    public static final String NAME = "name";
    public static final String NAME_UPDT = "nameUpdated";
    public static final String MAIL = "email@mail";
    public static final String MAIL_UPDT = "email@updt";
    public static final String PHONE_NUMBER = "phoneNumber";
    public static final String PHONE_NUMBER_UPDT = "phoneNumberUpdt";
    public static final String AVATAR = "avatar";
    public static final String AVATAR_UPDT = "avatarUpdt";
    public static final String EVENT_ID = "eventId";

    private Participant participant;
    private UpdateParticipantDTO updateParticipantDTO;
    private RecoveryParticipantsDTO recoveryParticipantsDTO;

    @InjectMocks
    private UpdateParticipantService service;

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
    void whenUpdateParticipantThenReturnParticipantUpdated() {
        when(this.repository.findById(anyString())).thenReturn(Optional.ofNullable(this.participant));
        when(this.repository.save(any())).thenReturn(this.participant);
        when(this.mapper.mapRecoveryParticipantDTO(any())).thenReturn(this.recoveryParticipantsDTO);

        RecoveryParticipantsDTO response = this.service.execute(ID, this.updateParticipantDTO);

        assertNotNull(response);
        assertEquals(this.updateParticipantDTO.name(), participant.getName());
        assertEquals(this.updateParticipantDTO.email(), participant.getEmail());
        assertEquals(this.updateParticipantDTO.phoneNumber(), participant.getPhoneNumber());
        assertEquals(this.updateParticipantDTO.avatar(), participant.getAvatar());
        assertEquals(this.updateParticipantDTO.status(), participant.getStatus());
        verify(this.repository,times(1)).save(any());
    }

    @Test
    void whenUpdateParticipantThatNotExistsThenThrowAnParticipantNotFound(){
        when(this.repository.findById(anyString())).thenReturn(Optional.empty());
        assertThrows(ParticipantNotFound.class, () -> this.service.execute(ID,this.updateParticipantDTO));
    }

    void startDomains() {
        this.participant = new Participant(ID, NAME, MAIL, PHONE_NUMBER, AVATAR, EVENT_ID, null, LocalDate.now(), LocalDate.now());
        this.updateParticipantDTO = new UpdateParticipantDTO(NAME_UPDT, MAIL_UPDT, PHONE_NUMBER_UPDT, AVATAR_UPDT, false);
        this.recoveryParticipantsDTO = new RecoveryParticipantsDTO(ID, NAME, MAIL, PHONE_NUMBER, AVATAR, EVENT_ID, null, LocalDate.now(), LocalDate.now());
    }
}