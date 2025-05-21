package com.sportfinances.participants.mappers;

import com.sportfinances.participants.dtos.RecoveryParticipantsDTO;
import com.sportfinances.participants.entities.Participant;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {
    // RecoveryParticipantsDTO mapRecoveryParticipantsDTO(List<Participant> participants);

    RecoveryParticipantsDTO mapRecoveryParticipantDTO(Participant participant);

    Participant mapCreateParticipantDTO(Participant participant);
}
