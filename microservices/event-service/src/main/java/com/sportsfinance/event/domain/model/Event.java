package com.sportsfinance.event.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String eventId;

    private String name;
    private String description;
    private EventTypeEnum type;
    private Double valueMonthly;
    private String dayMonthly;
    private String responsibleId;

    private LocalDateTime createDate = LocalDateTime.now();
    private LocalDateTime updateDate = LocalDateTime.now();
}
