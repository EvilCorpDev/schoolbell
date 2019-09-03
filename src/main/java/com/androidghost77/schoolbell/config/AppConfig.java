package com.androidghost77.schoolbell.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.androidghost77.schoolbell.listener.AppStartListener;
import com.androidghost77.schoolbell.mapper.ProfileMapper;
import com.androidghost77.schoolbell.mapper.ScheduleMapper;
import com.androidghost77.schoolbell.model.Schedule;
import com.androidghost77.schoolbell.repo.ExceptionDayRepo;
import com.androidghost77.schoolbell.repo.ProfileRepo;
import com.androidghost77.schoolbell.repo.ScheduleRepo;
import com.androidghost77.schoolbell.schedule.BellScheduler;
import com.androidghost77.schoolbell.schedule.Scheduler;
import com.androidghost77.schoolbell.service.ProfileScheduleService;
import com.androidghost77.schoolbell.service.impl.ProfileScheduleServiceImpl;
import com.androidghost77.schoolbell.service.player.Player;
import com.androidghost77.schoolbell.service.player.impl.AudioPlayer;

@Configuration
public class AppConfig {

    @Bean
    public Scheduler<Schedule> bellScheduler(ExceptionDayRepo exceptionDayRepo) {
        return new BellScheduler(exceptionDayRepo);
    }

    @Bean
    public ProfileScheduleService profileScheduleService(ProfileRepo profileRepo, ScheduleRepo scheduleRepo,
            ScheduleMapper scheduleMapper, ProfileMapper profileMapper, Scheduler<Schedule> bellScheduler) {
        return new ProfileScheduleServiceImpl(profileRepo, scheduleRepo, scheduleMapper, profileMapper, bellScheduler);
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
