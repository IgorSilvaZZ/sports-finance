package com.sportsfinance.event.api.dto;

import com.sportsfinance.event.domain.model.EventTypeEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message="{type.not.null}")
    private EventTypeEnum type;
    @NotNull(message="{value.not.null}")
    private Double valueMonthly;
    @NotBlank(message="{day.not.blank}")
    private String dayMonthly;
    @NotBlank(message="{respid.not.blank}")
    private String responsibleId;

}
