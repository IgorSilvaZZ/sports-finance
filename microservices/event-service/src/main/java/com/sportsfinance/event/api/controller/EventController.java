package com.sportsfinance.event.api.controller;

import com.sportsfinance.event.api.dto.CreateEventDTO;
import com.sportsfinance.event.api.dto.EventResponseDTO;
import com.sportsfinance.event.api.dto.EventUpdateDTO;
import com.sportsfinance.event.domain.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/")
    public ResponseEntity<EventResponseDTO> createEvent(@RequestBody CreateEventDTO createEventDTO){
        return ResponseEntity.ok(this.eventService.createEvent(createEventDTO));
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<EventResponseDTO> findEventById(@PathVariable String eventId){
        return ResponseEntity.ok(this.eventService.findEventById(eventId));
    }

    @GetMapping("/responsible/{responsibleId}")
    public ResponseEntity<List<EventResponseDTO>> findEventsByResponsible(@PathVariable String responsibleId){
        return ResponseEntity.ok(this.eventService.findEventsByResponsibleId(responsibleId));
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<EventResponseDTO> updateEvent
            (@PathVariable String eventId, @RequestBody EventUpdateDTO eventUpdateDTO){
        return ResponseEntity.ok(this.eventService.updateEvent(eventId, eventUpdateDTO));
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity deleteEvent(@PathVariable String eventId){
        this.eventService.deleteEvent(eventId);
        return ResponseEntity.ok().build();
    }


}
