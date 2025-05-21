package com.sportfinances.participants.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Optional;

public record CreateParticipantDTO(
        @NotBlank(message = "{name.not.blank}")
        @Size(message = "{size.min.message}", min = 2)
        String name,

        @NotBlank(message = "{eventId.not.blank}")
        String eventId,

        @Email(message = "{email.valid.message}")
        String email,

        @NotBlank(message = "{phoneNumber.not.blank}")
        @Size(message = "{size.message}", min=10, max = 14)
        String phoneNumber,

        String avatar,

        Boolean status
) {
}
