package com.androidghost77.schoolbell.listener;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.androidghost77.schoolbell.service.SchedulerService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AppStartListener {

    private final SchedulerService schedulerService;

    @EventListener(ApplicationReadyEvent.class)
    public void startSchedulingOnAppStart() {
        schedulerService.startScheduling(false);
    }
}
