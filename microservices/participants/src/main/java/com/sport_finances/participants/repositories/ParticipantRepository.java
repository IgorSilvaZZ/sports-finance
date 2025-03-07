package com.sport_finances.participants.repositories;

import org.springframework.stereotype.Repository;
import com.sport_finances.participants.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, String> {}
