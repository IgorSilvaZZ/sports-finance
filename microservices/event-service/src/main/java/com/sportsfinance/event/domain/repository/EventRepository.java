package com.sportsfinance.event.domain.repository;

import com.sportsfinance.event.domain.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, String> {

    Event findByEventId(String eventId);
    List<Event> findByResponsibleId(String responsibleId);

}
