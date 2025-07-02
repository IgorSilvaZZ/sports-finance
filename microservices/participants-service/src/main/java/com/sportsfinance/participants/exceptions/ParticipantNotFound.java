package com.sportsfinance.participants.exceptions;

public class ParticipantNotFound extends RuntimeException {
    public ParticipantNotFound() {
        super("Participant not found!");
    }
}
