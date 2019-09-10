package com.androidghost77.schoolbell.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleItemDto {

    private String id;
    private String time;
    private Long duration;
    private long startSec;
    private String audioPath;
    private String audioFile;
    private String fileName;
    private boolean existing = true;
}
