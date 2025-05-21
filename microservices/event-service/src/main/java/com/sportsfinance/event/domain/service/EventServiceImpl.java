package com.sportsfinance.event.domain.service;

import com.sportsfinance.event.api.dto.CreateEventDTO;
import com.sportsfinance.event.api.dto.EventResponseDTO;
import com.sportsfinance.event.api.dto.EventUpdateDTO;
import com.sportsfinance.event.api.mapper.EventMapper;
import com.sportsfinance.event.domain.model.Event;
import com.sportsfinance.event.domain.repository.EventRepository;
import com.sportsfinance.event.exception.EventNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService{

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventMapper eventMapper;

    @Override
    public EventResponseDTO createEvent(CreateEventDTO createEventDTO) {
        return this.eventMapper
                .toEventResponseDTO(this.eventRepository.save(this.eventMapper.toEvent(createEventDTO)));
    }

    @Override
    public EventResponseDTO findEventById(String eventId) {
        Event event = this.eventRepository
                .findById(eventId).orElseThrow(() -> new EventNotFoundException("Event not found."));
        return this.eventMapper.toEventResponseDTO(event);
    }

    @Override
    public List<EventResponseDTO> findEventsByResponsibleId(String responsibleId) {
        List<Event> events = this.eventRepository.findByResponsibleId(responsibleId);
        if(events.isEmpty()) throw new EventNotFoundException("Has not events to this responsible.");
        return this.eventMapper.toEventResponseDTOList(events);
    }

    @Override
    public EventResponseDTO updateEvent(String eventId, EventUpdateDTO eventUpdateDTO) {
        Event event = this.eventRepository
                .findById(eventId).orElseThrow(() -> new EventNotFoundException("Event not found."));
        return this.eventMapper.toEventResponseDTO(
                this.eventRepository.save(this.eventMapper.updateEventFromEventUpdateDTO(eventUpdateDTO, event)));
    }

    @Override
    public void deleteEvent(String eventId) {
        this.eventRepository
                .findById(eventId).orElseThrow(() -> new EventNotFoundException("Event not found."));
        this.eventRepository.deleteById(eventId);
    }
}
