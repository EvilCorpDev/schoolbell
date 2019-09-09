package com.androidghost77.schoolbell.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.listener.AppStartListener;
import com.androidghost77.schoolbell.mapper.ExceptionItemMapper;
import com.androidghost77.schoolbell.mapper.ProfileMapper;
import com.androidghost77.schoolbell.mapper.ScheduleMapper;
import com.androidghost77.schoolbell.model.Schedule;
import com.androidghost77.schoolbell.repo.ExceptionDayRepo;
import com.androidghost77.schoolbell.repo.ProfileRepo;
import com.androidghost77.schoolbell.repo.ScheduleRepo;
import com.androidghost77.schoolbell.schedule.BellScheduler;
import com.androidghost77.schoolbell.schedule.Scheduler;
import com.androidghost77.schoolbell.service.ExceptionsService;
import com.androidghost77.schoolbell.service.ProfileScheduleService;
import com.androidghost77.schoolbell.service.impl.ExceptionsServiceImpl;
import com.androidghost77.schoolbell.service.impl.ProfileScheduleServiceImpl;
import com.androidghost77.schoolbell.service.player.Player;
import com.androidghost77.schoolbell.service.player.impl.AudioPlayer;

@Configuration
public class AppConfig {

    @Bean
    public Scheduler<Schedule, ExceptionItemDto> bellScheduler() {
        return new BellScheduler();
    }

    @Bean
    public ExceptionsService exceptionsService(ExceptionDayRepo exceptionDayRepo, ExceptionItemMapper itemMapper) {
        return new ExceptionsServiceImpl(exceptionDayRepo, itemMapper);
    }

    @Bean
    public ProfileScheduleService profileScheduleService(ProfileRepo profileRepo, ScheduleRepo scheduleRepo,
                                                         ScheduleMapper scheduleMapper, ProfileMapper profileMapper,
                                                         Scheduler<Schedule, ExceptionItemDto> bellScheduler,
                                                         ExceptionsService exceptionsService) {
        return new ProfileScheduleServiceImpl(profileRepo, scheduleRepo, scheduleMapper,
                profileMapper, bellScheduler, exceptionsService);
    }

    @Bean
    public AppStartListener appStartListener(ProfileScheduleService service) {
        return new AppStartListener(service);
    }

    @Bean
    public Player audioPlayer() {
        return new AudioPlayer();
    }
}
