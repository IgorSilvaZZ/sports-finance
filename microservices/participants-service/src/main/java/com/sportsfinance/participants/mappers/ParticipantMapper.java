package com.sportsfinance.participants.mappers;

import com.sportsfinance.participants.dtos.RecoveryParticipantsDTO;
import com.sportsfinance.participants.entities.Participant;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {
    // RecoveryParticipantsDTO mapRecoveryParticipantsDTO(List<Participant> participants);

    RecoveryParticipantsDTO mapRecoveryParticipantDTO(Participant participant);

    Participant mapCreateParticipantDTO(Participant participant);
}
