package com.androidghost77.schoolbell.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.androidghost77.schoolbell.dto.ProfileScheduleDto;
import com.androidghost77.schoolbell.model.Profile;

@Mapper(componentModel="spring", uses = {ScheduleMapper.class})
public interface ProfileMapper {

    @Mapping(source = "scheduleList", target = "scheduleItems")
    ProfileScheduleDto profileScheduleToDto(Profile profile);

    @InheritInverseConfiguration
    Profile dtoToProfileSchedule(ProfileScheduleDto scheduleDto);
}
