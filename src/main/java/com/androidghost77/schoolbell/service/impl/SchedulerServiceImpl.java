package com.androidghost77.schoolbell.service.impl;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.schedule.Scheduler;
import com.androidghost77.schoolbell.service.ExceptionsService;
import com.androidghost77.schoolbell.service.ProfileScheduleService;
import com.androidghost77.schoolbell.service.SchedulerService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SchedulerServiceImpl implements SchedulerService {

    private final Scheduler<ScheduleItemDto, ExceptionItemDto> bellScheduler;
    private final ExceptionsService exceptionsService;
    private final ProfileScheduleService profileScheduleService;

    @Override
    public void startScheduling(boolean restart) {
        if (restart) {
            stopScheduling();
        }

        bellScheduler.schedule(profileScheduleService.getScheduleItemsWithActiveProfile(),
                exceptionsService.getExceptionItemsWithActiveOrEmptyProfile());
    }

    @Override
    public void stopScheduling() {
        bellScheduler.stopSchedule();
    }
}
