package com.sport_finances.participants.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.sport_finances.participants.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, String> {
    @Query("SELECT p FROM Participant p WHERE p.status = TRUE AND p.name = :name AND p.eventId = :eventId")
    Optional<Participant> findActiveParticipantByEventId(@Param("name") String name, @Param("eventId") String eventId);
}
