package com.sportsfinance.responsible.domain.repository;

import com.sportsfinance.responsible.api.dto.CreateResponsibleDTO;
import com.sportsfinance.responsible.domain.model.Responsible;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponsibleRepository  extends JpaRepository<Responsible, String> {

    Responsible findByEmail(String email);
    CreateResponsibleDTO findByResponsibleId(String responsibleId);

}
