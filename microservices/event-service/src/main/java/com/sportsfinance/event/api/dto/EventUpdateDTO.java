package com.sportsfinance.event.api.dto;

import com.sportsfinance.event.domain.model.EventTypeEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventUpdateDTO {

    private String name;
    private String description;
    private EventTypeEnum type;
    private Double valueMonthly;
    private String dayMonthly;
    private String responsibleId;
    private LocalDateTime updateDate = LocalDateTime.now();

}
