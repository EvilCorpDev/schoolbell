package com.androidghost77.schoolbell.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.androidghost77.schoolbell.dto.ProfileScheduleDto;
import com.androidghost77.schoolbell.model.Profile;

@Mapper(componentModel="spring", uses = {ScheduleMapper.class})
public interface ProfileMapper {

    @Mapping(source = "scheduleList", target = "scheduleItems")
    @Mapping(source = "isActive", target = "active")
    ProfileScheduleDto profileScheduleToDtoWithScheduleList(Profile profile);

    @Mapping(source = "scheduleItems", target = "scheduleList")
    @Mapping(source = "active", target = "isActive")
    Profile dtoToProfileScheduleWithItems(ProfileScheduleDto scheduleDto);

    @Mapping(source = "active", target = "isActive")
    Profile dtoToProfileSchedule(ProfileScheduleDto scheduleDto);
}
