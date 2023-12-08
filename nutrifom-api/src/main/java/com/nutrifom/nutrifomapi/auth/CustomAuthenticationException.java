package com.nutrifom.nutrifomapi.auth;

import org.springframework.http.HttpStatus;

public class CustomAuthenticationException extends RuntimeException {
    private final HttpStatus httpStatus;

    public CustomAuthenticationException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}

