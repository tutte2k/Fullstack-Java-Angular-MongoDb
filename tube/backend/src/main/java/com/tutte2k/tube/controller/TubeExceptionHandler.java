package com.tutte2k.tube.controller;

import com.tutte2k.tube.exception.TubeException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class TubeExceptionHandler extends ResponseEntityExceptionHandler{
    @ExceptionHandler(value = TubeException.class)
    protected ResponseEntity<Object> handleException(TubeException exception, WebRequest webRequest) {
        String responseBody = exception.getMessage();
        return handleExceptionInternal(exception, responseBody, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, webRequest);
    }
}
