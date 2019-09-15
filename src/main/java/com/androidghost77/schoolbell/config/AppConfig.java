package com.androidghost77.schoolbell.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.listener.AppStartListener;
import com.androidghost77.schoolbell.logging.RequestResponseLoggingFilter;
import com.androidghost77.schoolbell.mapper.ExceptionItemMapper;
import com.androidghost77.schoolbell.mapper.ProfileMapper;
import com.androidghost77.schoolbell.mapper.ScheduleMapper;
import com.androidghost77.schoolbell.repo.ExceptionDayRepo;
import com.androidghost77.schoolbell.repo.ProfileRepo;
import com.androidghost77.schoolbell.repo.ScheduleRepo;
import com.androidghost77.schoolbell.repo.UserRepo;
import com.androidghost77.schoolbell.schedule.BellScheduler;
import com.androidghost77.schoolbell.schedule.Scheduler;
import com.androidghost77.schoolbell.security.DbUserDetailsManager;
import com.androidghost77.schoolbell.service.ExceptionsService;
import com.androidghost77.schoolbell.service.ProfileScheduleService;
import com.androidghost77.schoolbell.service.SchedulerService;
import com.androidghost77.schoolbell.service.impl.ExceptionsServiceImpl;
import com.androidghost77.schoolbell.service.impl.ProfileScheduleServiceImpl;
import com.androidghost77.schoolbell.service.impl.SchedulerServiceImpl;
import com.androidghost77.schoolbell.service.player.Player;
import com.androidghost77.schoolbell.service.player.impl.AudioPlayer;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.nio.charset.StandardCharsets;

@Configuration
public class AppConfig {

    @Bean
    public Scheduler<ScheduleItemDto, ExceptionItemDto> bellScheduler() {
        return new BellScheduler();
    }

    @Bean
    public ProfileScheduleService profileScheduleService(ProfileRepo profileRepo, ScheduleRepo scheduleRepo,
                                                         ScheduleMapper scheduleMapper, ProfileMapper profileMapper,
                                                         ExceptionDayRepo exceptionDayRepo) {
        return new ProfileScheduleServiceImpl(profileRepo, scheduleRepo, scheduleMapper,
                profileMapper, exceptionDayRepo);
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

    @Bean
    public RequestResponseLoggingFilter requestResponseLoggingFilter() {
        return new RequestResponseLoggingFilter();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsManager userDetailsManager(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder) {
        return new DbUserDetailsManager(userRepo, passwordEncoder);
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setForceEncoding(true);
        characterEncodingFilter.setEncoding(StandardCharsets.UTF_8.toString());
        registrationBean.setFilter(characterEncodingFilter);
        return registrationBean;
    }
}
