package com.sportsfinance.participants.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateParticipantDTO(
        @Size(message = "{size.min.message}", min = 2)
        String name,

        @Email(message = "{email.valid.message}")
        String email,

        @Size(message = "{size.message}", min = 10, max = 14)
        String phoneNumber,

        String avatar,
        Boolean status
) {
}