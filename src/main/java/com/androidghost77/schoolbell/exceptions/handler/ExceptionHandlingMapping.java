package com.androidghost77.schoolbell.exceptions.handler;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.http.HttpStatus;

import com.androidghost77.schoolbell.exceptions.handler.dto.ExceptionMappingDetails;

public class ExceptionHandlingMapping {

    private static final ExceptionMappingDetails DEFAULT_MAPPING = new ExceptionMappingDetails(
            "Server error", HttpStatus.INTERNAL_SERVER_ERROR, Exception::getMessage);

    private Map<Class<? extends Exception>, ExceptionMappingDetails> exceptionMappings;

    private ExceptionHandlingMapping(Map<Class<? extends Exception>, ExceptionMappingDetails> exceptionMappings) {
        this.exceptionMappings = exceptionMappings;
    }

    public static ExceptionHandlingMappingBuilderBuilder builder() {
        return new ExceptionHandlingMappingBuilderBuilder();
    }

    public ExceptionMappingDetails getOrDefault(Class<? extends Exception> excClass) {
        return exceptionMappings.getOrDefault(excClass, DEFAULT_MAPPING);
    }

    public static class ExceptionHandlingMappingBuilderBuilder {
        private Map<Class<? extends Exception>, ExceptionMappingDetails> exceptionMappings;

        ExceptionHandlingMappingBuilderBuilder() {
            this.exceptionMappings = new HashMap<>();
        }

        public ExceptionHandlingMappingBuilderBuilder add(Class<? extends Exception> exc,
                                                          Function<Exception, String> responseBodyFun,
                                                          String shortMessage, HttpStatus httpStatus) {
            ExceptionMappingDetails mapping = new ExceptionMappingDetails(shortMessage, httpStatus, responseBodyFun);
            exceptionMappings.put(exc, mapping);
            return this;
        }

        public ExceptionHandlingMapping build() {
            return new ExceptionHandlingMapping(exceptionMappings);
        }
    }
}
