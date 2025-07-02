package com.sportsfinance.participants.services;

import com.sportsfinance.participants.dtos.RecoveryParticipantsDTO;
import com.sportsfinance.participants.dtos.UpdateParticipantDTO;
import com.sportsfinance.participants.entities.Participant;
import com.sportsfinance.participants.exceptions.ParticipantNotFound;
import com.sportsfinance.participants.mappers.ParticipantMapper;
import com.sportsfinance.participants.repositories.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    ParticipantMapper participantMapper;

    public RecoveryParticipantsDTO execute(String participantId, UpdateParticipantDTO updateParticipantDTO) {
        Participant participantAlreadyExists = this.participantRepository.findById(participantId).orElseThrow(ParticipantNotFound::new);

        if (updateParticipantDTO.name() != null) {
            participantAlreadyExists.setName(updateParticipantDTO.name());
        }

        if (updateParticipantDTO.email() != null) {
            participantAlreadyExists.setEmail(updateParticipantDTO.email());
        }

        if (updateParticipantDTO.phoneNumber() != null) {
            participantAlreadyExists.setPhoneNumber(updateParticipantDTO.phoneNumber());
        }

        if (updateParticipantDTO.avatar() != null) {
            participantAlreadyExists.setAvatar(updateParticipantDTO.avatar());
        }

        if (updateParticipantDTO.status() != null) {
            participantAlreadyExists.setStatus(updateParticipantDTO.status());
        }

        Participant updateParticipant = this.participantRepository.save(participantAlreadyExists);

        return this.participantMapper.mapRecoveryParticipantDTO(updateParticipant);

    }

}
