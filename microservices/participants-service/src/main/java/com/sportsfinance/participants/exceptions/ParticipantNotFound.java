package com.sportfinances.participants.exceptions;

public class ParticipantNotFound extends RuntimeException {
    public ParticipantNotFound() {
        super("Participant not found!");
    }
}
