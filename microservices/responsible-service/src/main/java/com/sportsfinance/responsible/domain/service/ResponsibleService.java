package com.sportsfinance.responsible.domain.service;

import com.sportsfinance.responsible.api.dto.AuthenticateResponsibleDTO;
import com.sportsfinance.responsible.api.dto.CreateResponsibleDTO;

public interface ResponsibleService {

    CreateResponsibleDTO createResponsible(CreateResponsibleDTO createResponsibleDTO);
    AuthenticateResponsibleDTO authenticateResponsible(AuthenticateResponsibleDTO authenticateResponsibleDTO);

}
