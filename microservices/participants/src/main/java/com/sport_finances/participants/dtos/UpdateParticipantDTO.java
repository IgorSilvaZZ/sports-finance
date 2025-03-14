package com.sport_finances.participants.dtos;

public record UpdateParticipantDTO(
        String name,
        String email,
        String phoneNumber,
        String avatar,
        Boolean status
) {
}
