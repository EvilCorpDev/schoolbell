package com.androidghost77.model;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class NewProfileSchedule {

    private final String profileName;
    private final String profilePath;
    private final List<ScheduleItem> scheduleItems;

}
