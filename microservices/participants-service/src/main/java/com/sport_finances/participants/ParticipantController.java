package com.sport_finances.participants;

import com.sport_finances.participants.dtos.CreateParticipantDTO;
import com.sport_finances.participants.dtos.RecoveryParticipantsDTO;
import com.sport_finances.participants.dtos.UpdateParticipantDTO;
import com.sport_finances.participants.mappers.ParticipantMapper;
import com.sport_finances.participants.services.CreateParticipantService;
import com.sport_finances.participants.services.UpdateParticipantService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/participants")
public class ParticipantController {

    @Autowired
    private CreateParticipantService createParticipantService;

    @Autowired
    private UpdateParticipantService updateParticipantService;

    @Autowired
    ParticipantMapper participantMapper;

    @PostMapping
    public ResponseEntity<RecoveryParticipantsDTO> create(@RequestBody() @Valid CreateParticipantDTO createParticipantDTO) {
        RecoveryParticipantsDTO participant = this.createParticipantService.execute(createParticipantDTO);

        return new ResponseEntity<>(participant, HttpStatus.CREATED);
    }

    @PutMapping("/{participantId}")
    public ResponseEntity<RecoveryParticipantsDTO> updateById(
            @PathVariable String participantId, @RequestBody UpdateParticipantDTO updateParticipantDTO
    ) {
        RecoveryParticipantsDTO participantUpdated = this.updateParticipantService.execute(
                participantId,
                updateParticipantDTO
        );

        return new ResponseEntity<>(participantUpdated, HttpStatus.OK);
    }

}
