package com.androidghost77.schoolbell.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.listener.AppStartListener;
import com.androidghost77.schoolbell.mapper.ExceptionItemMapper;
import com.androidghost77.schoolbell.mapper.ProfileMapper;
import com.androidghost77.schoolbell.mapper.ScheduleMapper;
import com.androidghost77.schoolbell.repo.ExceptionDayRepo;
import com.androidghost77.schoolbell.repo.ProfileRepo;
import com.androidghost77.schoolbell.repo.ScheduleRepo;
import com.androidghost77.schoolbell.schedule.BellScheduler;
import com.androidghost77.schoolbell.schedule.Scheduler;
import com.androidghost77.schoolbell.service.ExceptionsService;
import com.androidghost77.schoolbell.service.ProfileScheduleService;
import com.androidghost77.schoolbell.service.SchedulerService;
import com.androidghost77.schoolbell.service.impl.ExceptionsServiceImpl;
import com.androidghost77.schoolbell.service.impl.ProfileScheduleServiceImpl;
import com.androidghost77.schoolbell.service.impl.SchedulerServiceImpl;
import com.androidghost77.schoolbell.service.player.Player;
import com.androidghost77.schoolbell.service.player.impl.AudioPlayer;

@Configuration
public class AppConfig {

    @Bean
    public Scheduler<ScheduleItemDto, ExceptionItemDto> bellScheduler() {
        return new BellScheduler();
    }

    @Bean
    public ProfileScheduleService profileScheduleService(ProfileRepo profileRepo, ScheduleRepo scheduleRepo,
                                                         ScheduleMapper scheduleMapper, ProfileMapper profileMapper) {
        return new ProfileScheduleServiceImpl(profileRepo, scheduleRepo, scheduleMapper,
                profileMapper);
    }

    @Bean
    public ExceptionsService exceptionsService(ExceptionDayRepo exceptionDayRepo, ExceptionItemMapper itemMapper,
                                               ProfileScheduleService profileScheduleService) {
        return new ExceptionsServiceImpl(exceptionDayRepo, itemMapper, profileScheduleService);
    }

    @Bean
    public SchedulerService schedulerService(Scheduler<ScheduleItemDto, ExceptionItemDto> bellScheduler,
                                             ExceptionsService exceptionsService,
                                             ProfileScheduleService profileScheduleService) {
        return new SchedulerServiceImpl(bellScheduler, exceptionsService, profileScheduleService);
    }

    @Bean
    public AppStartListener appStartListener(SchedulerService service) {
        return new AppStartListener(service);
    }

    @Bean
    public Player audioPlayer() {
        return new AudioPlayer();
    }
}
