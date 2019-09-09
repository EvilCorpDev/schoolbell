package com.androidghost77.schoolbell.service;

import java.util.List;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;

public interface ExceptionsService {

    List<ExceptionItemDto> getAllExceptionItems();

    void saveExceptionItems(List<ExceptionItemDto> itemsToSave);

    void deleteExceptionItems(List<String> exceptionItemIds);
}
