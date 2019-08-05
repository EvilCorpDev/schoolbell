package com.androidghost77.schoolbell.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleItemDto {

    private String time;
    private long duration;
    private String audioPath;

}
