package com.sportfinances.participants.services;

import com.sportfinances.participants.dtos.CreateParticipantDTO;
import com.sportfinances.participants.dtos.RecoveryParticipantsDTO;
import com.sportfinances.participants.entities.Participant;
import com.sportfinances.participants.exceptions.ParticipantAlreadyExists;
import com.sportfinances.participants.mappers.ParticipantMapper;
import com.sportfinances.participants.repositories.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class CreateParticipantService {
    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    ParticipantMapper participantMapper;

    public RecoveryParticipantsDTO execute(CreateParticipantDTO createParticipantDTO) {
        Optional<Participant> participantActiveInEvent = this.participantRepository.findActiveParticipantByEventId(
                createParticipantDTO.name(),
                createParticipantDTO.eventId()
        );

        if (participantActiveInEvent.isPresent()) {
            throw new ParticipantAlreadyExists();
        }

        Boolean status = createParticipantDTO.status() != null ? createParticipantDTO.status() : true;

        /* Criando o participante atraves dos dados do DTO */
        Participant participantData = Participant.builder()
                .name(createParticipantDTO.name())
                .email(createParticipantDTO.email())
                .phoneNumber(createParticipantDTO.phoneNumber())
                .avatar(createParticipantDTO.avatar())
                .eventId(createParticipantDTO.eventId())
                .status(status)
                .createDate(new Date())
                .updateDate(new Date())
                .build();

        Participant participant = this.participantRepository.save(participantData);

        return this.participantMapper.mapRecoveryParticipantDTO(participant);
    }

}
