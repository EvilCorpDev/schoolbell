package com.androidghost77.schoolbell.listener;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.androidghost77.schoolbell.service.ProfileScheduleService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AppStartListener {

    private final ProfileScheduleService scheduleService;

    @EventListener(ApplicationReadyEvent.class)
    public void startSchedulingOnAppStart() {
        scheduleService.startScheduling(false);
    }
}
