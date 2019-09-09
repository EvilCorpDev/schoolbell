package com.androidghost77.schoolbell.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.model.ExceptionDay;

@Mapper(componentModel = "spring")
public interface ExceptionItemMapper {

    @Mapping(source = "profile", target = "profileName")
    ExceptionDay exceptionItemToDay(ExceptionItemDto source);

    @InheritInverseConfiguration
    ExceptionItemDto exceptionDayToItem(ExceptionDay source);
}
