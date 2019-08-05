package com.androidghost77.schoolbell.mapper;

import org.mapstruct.Mapper;

import com.androidghost77.schoolbell.dto.ProfileScheduleDto;
import com.androidghost77.schoolbell.model.Profile;

@Mapper(componentModel="spring")
public interface ProfileMapper {

    ProfileScheduleDto profileScheduleToDto(Profile profile);

    Profile dtoToProfileSchedule(ProfileScheduleDto scheduleDto);
}
