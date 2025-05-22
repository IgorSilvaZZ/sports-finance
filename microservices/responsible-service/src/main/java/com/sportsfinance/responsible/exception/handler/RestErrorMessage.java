package com.sportsfinance.responsible.exception.handler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestErrorMessage {
    private HttpStatus status;
    private String message;
    private String timestamp;
    private String path;
    private String errorCode;
}
