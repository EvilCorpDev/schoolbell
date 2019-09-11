package com.androidghost77.schoolbell.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

import com.androidghost77.schoolbell.exceptions.SaveException;
import com.androidghost77.schoolbell.exceptions.handler.ExceptionHandlingMapping;

@Configuration
public class ExceptionMappingConfig {

    @Bean
    public ExceptionHandlingMapping exceptionHandlingMapping() {
        return ExceptionHandlingMapping.builder()
                .add(SaveException.class, Exception::getMessage, "Save audio error", HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
    }
}
