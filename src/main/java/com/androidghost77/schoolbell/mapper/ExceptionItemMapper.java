package com.androidghost77.schoolbell.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.model.ExceptionDay;

@Mapper(componentModel = "spring")
public interface ExceptionItemMapper {

    @Mapping(target = "profile", ignore = true)
    ExceptionDay exceptionItemToDay(ExceptionItemDto source);

    @Mapping(source = "profile.name", target = "profile")
    ExceptionItemDto exceptionDayToItem(ExceptionDay source);
}
