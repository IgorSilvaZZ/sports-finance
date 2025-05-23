package com.sportsfinance.event.api.dto;

import com.sportsfinance.event.domain.model.EventTypeEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateEventDTO {

    @NotBlank(message="{name.not.blank}")
    private String name;
    @NotBlank(message="{desc.not.blank}")
    private String description;
    @NotBlank(message="{type.not.blank}")
    private EventTypeEnum type;
    @NotBlank(message="{value.not.blank}")
    private Double valueMonthly;
    @NotBlank(message="{day.not.blank}")
    private String dayMonthly;
    @NotBlank(message="{respid.not.blank}")
    private String responsibleId;

}
