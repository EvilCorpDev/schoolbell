package com.androidghost77.schoolbell.exceptions.handler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.androidghost77.schoolbell.exceptions.handler.dto.ExceptionMappingDetails;
import com.androidghost77.schoolbell.exceptions.handler.dto.ExceptionMessageDto;

import lombok.RequiredArgsConstructor;

@ControllerAdvice
@RequiredArgsConstructor
public class ExceptionHandlerResolver extends ResponseEntityExceptionHandler {

    private final ExceptionHandlingMapping exceptionHandlingMapping;

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleExceptions(Exception exc, WebRequest request) {
        ExceptionMappingDetails mappingDetails = exceptionHandlingMapping.getOrDefault(exc.getClass());
        ExceptionMessageDto messageDto = new ExceptionMessageDto(mappingDetails.getShortMessage(),
                mappingDetails.getMessageFun().apply(exc));
        return handleExceptionInternal(exc, messageDto, new HttpHeaders(), mappingDetails.getHttpStatus(), request);
    }
}
