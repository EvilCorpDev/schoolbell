package com.androidghost77.schoolbell.exceptions.handler.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExceptionMessageDto {

    private String shortMessage;
    private String message;
}
