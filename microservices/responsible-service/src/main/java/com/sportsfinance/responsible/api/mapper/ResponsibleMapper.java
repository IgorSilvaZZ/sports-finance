package com.sportsfinance.responsible.api.mapper;

import com.sportsfinance.responsible.api.dto.AuthenticateResponsibleDTO;
import com.sportsfinance.responsible.api.dto.CreateResponsibleDTO;
import com.sportsfinance.responsible.domain.model.Responsible;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ResponsibleMapper {

    Responsible toResponsible(CreateResponsibleDTO createResponsibleDTO);
    CreateResponsibleDTO toCreateResponsibleDTO(Responsible responsible);
    AuthenticateResponsibleDTO toAuthenticateResponsibleDTO(Responsible responsible);

}
