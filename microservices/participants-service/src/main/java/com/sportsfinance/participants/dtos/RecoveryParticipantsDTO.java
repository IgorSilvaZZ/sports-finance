package com.sportsfinance.participants.dtos;

import java.time.LocalDate;
import java.util.Date;

public record RecoveryParticipantsDTO(
        String id,
        String name,
        String email,
        String phoneNumber,
        String avatar,
        String eventId,
        Boolean status,
        LocalDate createDate,
        LocalDate updateDate
) {
}
