package com.sport_finances.participants;

import com.sport_finances.participants.dtos.CreateParticipantDTO;
import com.sport_finances.participants.dtos.RecoveryParticipantsDTO;
import com.sport_finances.participants.mappers.ParticipantMapper;
import com.sport_finances.participants.services.CreateParticipantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/participants")
public class ParticipantController {

    @Autowired
    private CreateParticipantService createParticipantService;

    @Autowired
    ParticipantMapper participantMapper;

    @PostMapping
    public ResponseEntity<RecoveryParticipantsDTO> create(@RequestBody() @Valid CreateParticipantDTO createParticipantDTO) {
        RecoveryParticipantsDTO participant = this.createParticipantService.execute(createParticipantDTO);

        return new ResponseEntity<>(participant, HttpStatus.CREATED);
    }

}
