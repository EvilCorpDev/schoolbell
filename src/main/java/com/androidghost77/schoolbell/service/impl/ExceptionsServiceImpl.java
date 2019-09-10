package com.androidghost77.schoolbell.service.impl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.mapper.ExceptionItemMapper;
import com.androidghost77.schoolbell.model.ExceptionDay;
import com.androidghost77.schoolbell.model.Profile;
import com.androidghost77.schoolbell.repo.ExceptionDayRepo;
import com.androidghost77.schoolbell.service.ExceptionsService;
import com.androidghost77.schoolbell.service.ProfileScheduleService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ExceptionsServiceImpl implements ExceptionsService {

    private final ExceptionDayRepo exceptionDayRepo;
    private final ExceptionItemMapper exceptionItemMapper;
    private final ProfileScheduleService profileScheduleService;

    @Override
    public List<ExceptionItemDto> getAllExceptionItems() {
        return exceptionDayRepo.findAll()
                .stream()
                .map(exceptionItemMapper::exceptionDayToItem)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExceptionItemDto> getAllExceptionItemsLinkedToProfile(String profileName) {
        return exceptionDayRepo.findAllByProfileName(profileName)
                .stream()
                .map(exceptionItemMapper::exceptionDayToItem)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExceptionItemDto> getExceptionItemsWithActiveOrEmptyProfile() {
        return exceptionDayRepo.findAllByActiveOrEmptyProfile()
                .stream()
                .map(exceptionItemMapper::exceptionDayToItem)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void saveExceptionItems(List<ExceptionItemDto> itemsToSave) {
        List<String> profileNames = itemsToSave.stream()
                .map(ExceptionItemDto::getProfile)
                .collect(Collectors.toList());
        Map<String, Profile> profilesMap = profileScheduleService.getProfilesByProfileNames(profileNames);

        List<ExceptionDay> exceptionDays = itemsToSave.stream()
                .map(exceptionItem -> convertToExceptionDay(exceptionItem, profilesMap))
                .collect(Collectors.toList());

        exceptionDayRepo.saveAll(exceptionDays);
    }

    @Override
    @Transactional
    public void deleteExceptionItemsIds(List<String> exceptionItemIds) {
        exceptionDayRepo.deleteAllById(exceptionItemIds);
    }

    @Override
    public void deleteExceptionItemsByProfileNames(List<String> profileNames) {
        exceptionDayRepo.deleteAllByProfileName(profileNames);
    }

    private ExceptionDay convertToExceptionDay(ExceptionItemDto itemDto, Map<String, Profile> profilesMap) {
        ExceptionDay exceptionDay = exceptionItemMapper.exceptionItemToDay(itemDto);
        exceptionDay.setProfile(profilesMap.get(itemDto.getProfile()));

        return exceptionDay;
    }
}
