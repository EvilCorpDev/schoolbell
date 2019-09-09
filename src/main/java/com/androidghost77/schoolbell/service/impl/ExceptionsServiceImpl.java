package com.androidghost77.schoolbell.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.mapper.ExceptionItemMapper;
import com.androidghost77.schoolbell.model.ExceptionDay;
import com.androidghost77.schoolbell.repo.ExceptionDayRepo;
import com.androidghost77.schoolbell.service.ExceptionsService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ExceptionsServiceImpl implements ExceptionsService {

    private final ExceptionDayRepo exceptionDayRepo;
    private final ExceptionItemMapper exceptionItemMapper;

    @Override
    public List<ExceptionItemDto> getAllExceptionItems() {
        return exceptionDayRepo.findAll()
                .stream()
                .map(exceptionItemMapper::exceptionDayToItem)
                .collect(Collectors.toList());
    }

    @Override
    public void saveExceptionItems(List<ExceptionItemDto> itemsToSave) {
        List<ExceptionDay> exceptionDays = itemsToSave.stream()
                .map(exceptionItemMapper::exceptionItemToDay)
                .collect(Collectors.toList());

        exceptionDayRepo.saveAll(exceptionDays);
    }

    @Override
    @Transactional
    public void deleteExceptionItems(List<String> exceptionItemIds) {
        exceptionDayRepo.deleteAllById(exceptionItemIds);
    }
}
