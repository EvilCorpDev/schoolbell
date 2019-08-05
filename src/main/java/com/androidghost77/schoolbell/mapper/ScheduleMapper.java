package com.androidghost77.schoolbell.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.model.Schedule;

@Mapper(componentModel="spring")
public interface ScheduleMapper {

    ScheduleItemDto scheduleToDto(Schedule schedule);

    Schedule dtoToSchedule(ScheduleItemDto itemDto);

    List<Schedule> dtoListToScheduleList(List<ScheduleItemDto> scheduleItemDtoList);
}
