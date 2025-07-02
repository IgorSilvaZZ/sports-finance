package com.sportsfinance.event.api.dto;

import com.sportsfinance.event.domain.model.EventTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventResponseDTO {

    private String eventId;
    private String name;
    private String description;
    private EventTypeEnum type;
    private Double valueMonthly;
    private String dayMonthly;
    private String responsibleId;

}
