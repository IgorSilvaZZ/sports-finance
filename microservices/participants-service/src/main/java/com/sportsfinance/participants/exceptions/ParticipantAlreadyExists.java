package com.sportfinances.participants.exceptions;

public class ParticipantAlreadyExists extends RuntimeException {
    public ParticipantAlreadyExists() {
        super("Participant already exists in event!");
    }
}
