package com.sportfinances.participants;

import com.sportfinances.participants.dtos.CreateParticipantDTO;
import com.sportfinances.participants.dtos.RecoveryParticipantsDTO;
import com.sportfinances.participants.dtos.UpdateParticipantDTO;
import com.sportfinances.participants.mappers.ParticipantMapper;
import com.sportfinances.participants.services.CreateParticipantService;
import com.sportfinances.participants.services.UpdateParticipantService;
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
