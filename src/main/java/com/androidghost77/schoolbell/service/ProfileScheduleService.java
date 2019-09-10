package com.androidghost77.schoolbell.service;

import java.util.List;
import java.util.Map;

import com.androidghost77.schoolbell.dto.ProfileScheduleDto;
import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.model.Profile;

public interface ProfileScheduleService {

    List<ScheduleItemDto> getScheduleItems(String profileName);

    List<ScheduleItemDto> getScheduleItemsWithActiveProfile();

    void saveProfilesSchedule(List<ProfileScheduleDto> newProfilesSchedule);

    List<ProfileScheduleDto> getAllProfiles();

    List<String> getAllProfileNames();

    Map<String, Profile> getProfilesByProfileNames(List<String> profileNames);

    void deleteProfiles(List<String> profileIds);

    void deleteScheduleItems(List<String> scheduleItemsIds);
}
