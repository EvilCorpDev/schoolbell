package com.androidghost77.schoolbell.service;

import java.util.List;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;

public interface ExceptionsService {

    List<ExceptionItemDto> getAllExceptionItems();

    List<ExceptionItemDto> getAllExceptionItemsLinkedToProfile(String profileName);

    List<ExceptionItemDto> getExceptionItemsWithActiveOrEmptyProfile();

    void saveExceptionItems(List<ExceptionItemDto> itemsToSave);

    void deleteExceptionItemsIds(List<String> exceptionItemIds);

    void deleteExceptionItemsByProfileNames(List<String> profileNames);
}
