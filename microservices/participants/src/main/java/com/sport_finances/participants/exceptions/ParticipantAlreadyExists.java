package com.sport_finances.participants.exceptions;

public class ParticipantAlreadyExists extends RuntimeException {
    public ParticipantAlreadyExists() {
        super("Participant already exists in event!");
    }
}
