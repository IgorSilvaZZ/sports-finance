package com.sport_finances.participants.mappers;

import com.sport_finances.participants.dtos.RecoveryParticipantsDTO;
import com.sport_finances.participants.entities.Participant;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {
    // RecoveryParticipantsDTO mapRecoveryParticipantsDTO(List<Participant> participants);

    RecoveryParticipantsDTO mapRecoveryParticipantDTO(Participant participant);

    Participant mapCreateParticipantDTO(Participant participant);
}
