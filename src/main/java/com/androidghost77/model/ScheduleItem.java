package com.androidghost77.model;

import lombok.Data;

@Data
public class ScheduleItem {

    private final String time;
    private final long duration;
    private final String audioPath;

}
