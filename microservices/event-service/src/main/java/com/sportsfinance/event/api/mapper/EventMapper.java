package com.sportsfinance.event.api.mapper;

import com.sportsfinance.event.api.dto.CreateEventDTO;
import com.sportsfinance.event.api.dto.EventResponseDTO;
import com.sportsfinance.event.api.dto.EventUpdateDTO;
import com.sportsfinance.event.domain.model.Event;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface EventMapper {

    Event toEvent(CreateEventDTO createEventDTO);
    EventResponseDTO toEventResponseDTO(Event event);
    List<EventResponseDTO> toEventResponseDTOList(List<Event> events);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Event updateEventFromEventUpdateDTO(EventUpdateDTO eventUpdateDTO, @MappingTarget Event eventUpdate);

}
