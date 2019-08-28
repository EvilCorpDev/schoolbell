package com.androidghost77.schoolbell.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileScheduleDto {

    private String id;
    private String name;
    private boolean active = false;
    private boolean existing = true;
    private List<ScheduleItemDto> scheduleItems;

}
