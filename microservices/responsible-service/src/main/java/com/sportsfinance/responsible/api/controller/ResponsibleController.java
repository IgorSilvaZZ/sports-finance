package com.sportsfinance.responsible.api.controller;

import com.sportsfinance.responsible.api.dto.AuthenticateResponsibleDTO;
import com.sportsfinance.responsible.api.dto.CreateResponsibleDTO;
import com.sportsfinance.responsible.api.dto.ResponsibleLoginDTO;
import com.sportsfinance.responsible.config.security.TokenService;
import com.sportsfinance.responsible.domain.service.ResponsibleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/responsible")
public class ResponsibleController {

    @Autowired
    private ResponsibleService service;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/create")
    public ResponseEntity<CreateResponsibleDTO> createResponsible(@RequestBody @Valid CreateResponsibleDTO createResponsibleDTO) {
        CreateResponsibleDTO responsible = this.service.createResponsible(createResponsibleDTO);
        return ResponseEntity.ok(responsible);
    }

    @PostMapping("/auth")
    public ResponseEntity<ResponsibleLoginDTO> authenticateResponsible(@RequestBody AuthenticateResponsibleDTO authResponsible) {
        String token = this.tokenService.generateToken(this.service.authenticateResponsible(authResponsible));
        return ResponseEntity.ok(new ResponsibleLoginDTO(token));
    }

}
