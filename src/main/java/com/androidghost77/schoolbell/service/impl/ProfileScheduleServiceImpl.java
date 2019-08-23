package com.androidghost77.schoolbell.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.androidghost77.schoolbell.dto.ProfileScheduleDto;
import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.mapper.ProfileMapper;
import com.androidghost77.schoolbell.mapper.ScheduleMapper;
import com.androidghost77.schoolbell.model.Profile;
import com.androidghost77.schoolbell.model.Schedule;
import com.androidghost77.schoolbell.repo.ProfileRepo;
import com.androidghost77.schoolbell.repo.ScheduleRepo;
import com.androidghost77.schoolbell.schedule.Scheduler;
import com.androidghost77.schoolbell.service.ProfileScheduleService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ProfileScheduleServiceImpl implements ProfileScheduleService {

    private final ProfileRepo profileRepo;
    private final ScheduleRepo scheduleRepo;
    private final ScheduleMapper scheduleMapper;
    private final ProfileMapper profileMapper;
    private final Scheduler<Schedule> bellScheduler;

    @Override
    public List<ScheduleItemDto> getScheduleItems(String profileName) {
        return scheduleRepo.findAllByProfileName(profileName)
                .stream()
                .map(scheduleMapper::scheduleToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void saveNewProfileSchedule(ProfileScheduleDto profileDto) {
        Profile newProfile = profileMapper.dtoToProfileSchedule(profileDto);
        if(profileRepo.countAllByIsActive(true) == 0) {
            newProfile.setIsActive(true);
        }
        Profile savedProfile = profileRepo.save(newProfile);

        saveScheduleItems(profileDto.getScheduleItems(), savedProfile);
    }

    @Override
    public List<ProfileScheduleDto> getAllProfiles() {
        return profileRepo.findAll()
                .stream()
                .map(profileMapper::profileScheduleToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void startScheduling(boolean restart) {
        if (restart) {
            stopScheduling();
        }

        bellScheduler.schedule(scheduleRepo.findAllByProfileIsActive(true));
    }

    @Override
    public void stopScheduling() {
        bellScheduler.stopSchedule();
    }

    private void saveScheduleItems(List<ScheduleItemDto> scheduleItemDtos, Profile savedProfile) {
        List<Schedule> scheduleList = scheduleItemDtos.stream()
                .map(scheduleMapper::dtoToSchedule)
                .peek(item -> item.setProfile(savedProfile))
                .collect(Collectors.toList());
        scheduleRepo.saveAll(scheduleList);
    }
}
