package com.sportsfinance.responsible.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticateResponsibleDTO {

    @Email(message = "{email.valid.message}")
    private String email;

    @NotBlank(message = "{password.not.blank}")
    private String password;

}
