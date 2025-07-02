package com.sportsfinance.event.domain.service;

import com.sportsfinance.event.api.dto.CreateEventDTO;
import com.sportsfinance.event.api.dto.EventResponseDTO;
import com.sportsfinance.event.api.dto.EventUpdateDTO;

import java.util.List;

public interface EventService {

    EventResponseDTO createEvent(CreateEventDTO createEventDTO);
    EventResponseDTO findEventById(String eventId);
    List<EventResponseDTO> findEventsByResponsibleId(String responsibleId);
    EventResponseDTO updateEvent(String eventId, EventUpdateDTO eventUpdateDTO);
    void deleteEvent(String eventId);

}
