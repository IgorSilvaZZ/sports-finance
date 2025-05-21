package com.sportfinances.participants.exceptions.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.time.LocalDateTime;

// Vai ser usada como modelo padrão das nossas exceções na aplicação
// Usada para facilitar o tipo de reposta que vamos fornecer nas requisições caso haja algum erro

@Builder
public record ApiError(
        @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
        LocalDateTime timestamp,

        String typeError,

        Integer statusCode,

        String errorMessage
) {
}
