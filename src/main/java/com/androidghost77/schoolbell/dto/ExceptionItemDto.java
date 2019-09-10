package com.androidghost77.schoolbell.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ExceptionItemDto {

    private String id;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate specificDay;
    private Integer dayOfWeek;
    private String profile;
    private boolean existing = true;
}
