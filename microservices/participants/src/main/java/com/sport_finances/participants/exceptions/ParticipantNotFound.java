package com.sport_finances.participants.exceptions;

public class ParticipantNotFound extends RuntimeException {
    public ParticipantNotFound() {
        super("Participant not found!");
    }
}
