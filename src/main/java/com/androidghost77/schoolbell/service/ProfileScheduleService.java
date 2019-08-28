package com.androidghost77.schoolbell.service;

import java.util.List;

import com.androidghost77.schoolbell.dto.ProfileScheduleDto;
import com.androidghost77.schoolbell.dto.ScheduleItemDto;

public interface ProfileScheduleService {

    List<ScheduleItemDto> getScheduleItems(String profileName);

    void saveProfilesSchedule(List<ProfileScheduleDto> newProfilesSchedule);

    List<ProfileScheduleDto> getAllProfiles();

    void startScheduling(boolean restart);

    void stopScheduling();
}
