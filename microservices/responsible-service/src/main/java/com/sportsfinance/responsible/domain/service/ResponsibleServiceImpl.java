package com.sportsfinance.responsible.domain.service;

import com.sportsfinance.responsible.api.dto.AuthenticateResponsibleDTO;
import com.sportsfinance.responsible.api.dto.CreateResponsibleDTO;
import com.sportsfinance.responsible.api.mapper.ResponsibleMapper;
import com.sportsfinance.responsible.config.security.PasswordEncrypt;
import com.sportsfinance.responsible.domain.model.Responsible;
import com.sportsfinance.responsible.domain.repository.ResponsibleRepository;
import com.sportsfinance.responsible.exception.AlreadyExistsException;
import com.sportsfinance.responsible.exception.UnauthorizedException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResponsibleServiceImpl implements ResponsibleService {

    @Autowired
    private ResponsibleRepository repository;

    @Autowired
    private ResponsibleMapper mapper;

    @Override
    public CreateResponsibleDTO createResponsible(CreateResponsibleDTO createResponsibleDTO) {
        if (this.repository.findByEmail(createResponsibleDTO.getEmail()) != null)
            throw new AlreadyExistsException("Responsible already exists");
        String passwordEncoder = PasswordEncrypt.encoder(createResponsibleDTO.getPassword());
        createResponsibleDTO.setPassword(passwordEncoder);
        return this.mapper.toCreateResponsibleDTO(this.repository.save(this.mapper.toResponsible(createResponsibleDTO)));
    }

    @Override
    public AuthenticateResponsibleDTO authenticateResponsible(AuthenticateResponsibleDTO authenticateResponsibleDTO) {
        Responsible responsible = this.repository.findByEmail(authenticateResponsibleDTO.getEmail());
        if (responsible == null)
            throw new UnauthorizedException("Email Incorrect");
        if (!(PasswordEncrypt.decoder(authenticateResponsibleDTO.getPassword(), responsible.getPassword())))
            throw new UnauthorizedException("Password Incorrect");
        return this.mapper.toAuthenticateResponsibleDTO(responsible);
    }
}
