package com.sportsfinance.event.domain.service;

import com.sportsfinance.event.api.dto.CreateEventDTO;
import com.sportsfinance.event.api.dto.EventResponseDTO;
import com.sportsfinance.event.api.dto.EventUpdateDTO;
import com.sportsfinance.event.api.mapper.EventMapper;
import com.sportsfinance.event.domain.model.Event;
import com.sportsfinance.event.domain.model.EventTypeEnum;
import com.sportsfinance.event.domain.repository.EventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class EventServiceImplTest {

    public static final String ID = "ID";
    public static final String NAME = "eventName";
    public static final String EVENT_DESC = "eventDesc";
    public static final EventTypeEnum EVENT_TYPE_ENUM = EventTypeEnum.OTHER;
    public static final double VALUE_MONTHLY = 40.0;
    public static final String DAY_MONTHLY = "01";
    public static final String RESPONSIBLE_ID = "ResponsibleId";
    public static final LocalDateTime NOW = LocalDateTime.now();
    public static final String EVENT_NOT_FOUND = "Event not found.";

    private Event event;
    private CreateEventDTO createEventDTO;
    private EventUpdateDTO eventUpdateDTO;
    private EventResponseDTO eventResponseDTO;

    @Mock
    private EventRepository repository;

    @Mock
    private EventMapper mapper;

    @InjectMocks
    private EventServiceImpl service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        this.startDomains();
    }

    @Test
    void whenCreateEventThenReturnSuccess() {
        when(this.mapper.toEventResponseDTO(any())).thenReturn(this.eventResponseDTO);
        when(this.mapper.toEvent(any())).thenReturn(this.event);

        EventResponseDTO createEvent = this.service.createEvent(this.createEventDTO);

        assertNotNull(createEvent);
        assertEquals(EventResponseDTO.class, createEvent.getClass());
        verify(this.repository, times(1)).save(any());
    }

    @Test
    void whenFindEventsByIdThenReturnAnEvent() {
        when(this.repository.findById(anyString())).thenReturn(Optional.ofNullable(this.event));
        when(this.mapper.toEventResponseDTO(any())).thenReturn(this.eventResponseDTO);

        EventResponseDTO findEvent = this.service.findEventById(ID);

        assertNotNull(findEvent);
        verify(this.repository, times(1)).findById(anyString());
    }

    @Test
    void whenFindEventsByIdThenThrowAnEventNotFoundException() {
        try {
            this.service.findEventById(ID);
        } catch (Exception ex) {
            assertEquals(EVENT_NOT_FOUND, ex.getMessage());
        }
    }

    @Test
    void whenFindEventsByResponsibleIdThenReturnAnEventsList() {
        when(this.repository.findByResponsibleId(anyString())).thenReturn(List.of(this.event));
        when(this.mapper.toEventResponseDTOList(anyList())).thenReturn(List.of(this.eventResponseDTO));

        List<EventResponseDTO> findEvents = this.service.findEventsByResponsibleId(ID);

        assertNotNull(findEvents);
        verify(this.repository, times(1)).findByResponsibleId(anyString());
    }

    @Test
    void whenFindEventsByResponsibleIdThenThrowAnEventNotFoundException() {
        try {
            this.service.findEventsByResponsibleId(ID);
        } catch (Exception ex) {
           assertEquals("Has not events to this responsible.", ex.getMessage());
        }
    }

    @Test
    void whenUpdateEventThenReturnAnEvent() {
        when(this.repository.findById(anyString())).thenReturn(Optional.ofNullable(this.event));
        when(this.repository.save(any())).thenReturn(this.event);
        when(this.mapper.updateEventFromEventUpdateDTO(any(), any())).thenReturn(this.event);
        when(this.mapper.toEventResponseDTO(any())).thenReturn(this.eventResponseDTO);

        EventResponseDTO updateEvent = this.service.updateEvent(ID, this.eventUpdateDTO);

        assertNotNull(updateEvent);
        verify(this.repository, times(1)).findById(anyString());
        verify(this.repository, times(1)).save(any());
    }

    @Test
    void whenUpdateEventThenThrowAnEventNotFoundException() {

        try{
            this.service.updateEvent(ID, this.eventUpdateDTO);
        } catch (Exception ex) {
            assertEquals(EVENT_NOT_FOUND, ex.getMessage());
        }
    }

    @Test
    void whenDeleteEventThenReturnSuccess() {
        when(this.repository.findById(anyString())).thenReturn(Optional.ofNullable(this.event));

        this.service.deleteEvent(ID);

        verify(this.repository, times(1)).findById(anyString());
        verify(this.repository, times(1)).deleteById(anyString());
    }

    @Test
    void whenDeleteEventThenThrowAnEventNotFoundException() {

        try{
            this.service.deleteEvent(ID);
        } catch (Exception ex) {
            assertEquals(EVENT_NOT_FOUND, ex.getMessage());
        }
    }

    private void startDomains() {
        this.event = new Event(ID, NAME, EVENT_DESC, EVENT_TYPE_ENUM, VALUE_MONTHLY, DAY_MONTHLY, RESPONSIBLE_ID, NOW, NOW);
        this.createEventDTO = new CreateEventDTO(NAME, EVENT_DESC, EVENT_TYPE_ENUM, VALUE_MONTHLY, DAY_MONTHLY, RESPONSIBLE_ID);
        this.eventUpdateDTO = new EventUpdateDTO(NAME, EVENT_DESC, EVENT_TYPE_ENUM, VALUE_MONTHLY, DAY_MONTHLY, RESPONSIBLE_ID, NOW);
        this.eventResponseDTO = new EventResponseDTO(ID, NAME, EVENT_DESC, EVENT_TYPE_ENUM, VALUE_MONTHLY, DAY_MONTHLY, RESPONSIBLE_ID);
    }


}
