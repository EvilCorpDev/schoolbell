package com.androidghost77.schoolbell.service.impl;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;
import static com.androidghost77.schoolbell.utils.Util.applyFuncWrappingExc;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.IntStream;

import javax.transaction.Transactional;

import org.springframework.util.StringUtils;

import com.androidghost77.schoolbell.dto.ProfileScheduleDto;
import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.exceptions.SaveException;
import com.androidghost77.schoolbell.mapper.ProfileMapper;
import com.androidghost77.schoolbell.mapper.ScheduleMapper;
import com.androidghost77.schoolbell.model.Profile;
import com.androidghost77.schoolbell.model.Schedule;
import com.androidghost77.schoolbell.repo.ExceptionDayRepo;
import com.androidghost77.schoolbell.repo.ProfileRepo;
import com.androidghost77.schoolbell.repo.ScheduleRepo;
import com.androidghost77.schoolbell.service.ProfileScheduleService;
import com.androidghost77.schoolbell.utils.Util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class ProfileScheduleServiceImpl implements ProfileScheduleService {

    private final ProfileRepo profileRepo;
    private final ScheduleRepo scheduleRepo;
    private final ScheduleMapper scheduleMapper;
    private final ProfileMapper profileMapper;
    private final ExceptionDayRepo exceptionDayRepo;
    private final Base64.Decoder base64Decoder = Base64.getMimeDecoder();

    @Override
    public List<ScheduleItemDto> getScheduleItems(String profileName) {
        return scheduleRepo.findAllByProfileName(profileName)
                .stream()
                .map(scheduleMapper::scheduleToDto)
                .collect(toList());
    }

    @Override
    public List<ScheduleItemDto> getScheduleItemsWithActiveProfile() {
        return scheduleRepo.findAllByProfileIsActive(true)
                .stream()
                .map(scheduleMapper::scheduleToDto)
                .collect(toList());
    }

    @Override
    @Transactional
    public void saveProfilesSchedule(List<ProfileScheduleDto> profilesDto) {
        List<Profile> profilesToSave = profilesDto.stream()
                .map(profileMapper::dtoToProfileSchedule)
                .collect(toList());
        List<Profile> savedProfiles = profileRepo.saveAll(profilesToSave);

        IntStream.range(0, profilesDto.size())
                .forEach(index -> saveScheduleItems(
                        profilesDto.get(index).getScheduleItems(), savedProfiles.get(index)));
    }

    @Override
    public List<ProfileScheduleDto> getAllProfiles() {
        return profileRepo.findAll()
                .stream()
                .map(profileMapper::profileScheduleToDtoWithScheduleList)
                .collect(toList());
    }

    @Override
    public List<String> getAllProfileNames() {
        return profileRepo.getAllProfileNames();
    }

    @Override
    public Map<String, Profile> getProfilesByProfileNames(List<String> profileNames) {
        return profileRepo.findAllByNameIn(profileNames)
                .stream()
                .collect(toMap(Profile::getName, Function.identity()));
    }

    @Override
    @Transactional
    public void deleteProfiles(List<String> profileIds) {
        List<String> profileNames = profileRepo.findAllById(profileIds)
                .stream()
                .map(Profile::getName)
                .collect(toList());
        exceptionDayRepo.deleteAllByProfileName(profileNames);
        scheduleRepo.deleteAllByProfileId(profileIds);
        profileRepo.deleteAllById(profileIds);
    }

    @Override
    @Transactional
    public void deleteScheduleItems(List<String> scheduleItemsIds) {
        scheduleRepo.deleteAllById(scheduleItemsIds);
    }

    private void saveScheduleItems(List<ScheduleItemDto> scheduleItemDtos, Profile savedProfile) {
        List<Schedule> scheduleList = scheduleItemDtos.stream()
                .peek(this::saveAudioFileIfNotExists)
                .map(scheduleMapper::dtoToSchedule)
                .peek(item -> item.setProfile(savedProfile))
                .collect(toList());
        scheduleRepo.saveAll(scheduleList);
    }

    private void saveAudioFileIfNotExists(ScheduleItemDto scheduleItemDto) {
        if (StringUtils.isEmpty(scheduleItemDto.getAudioFile())) {
            return;
        }

        byte[] decodedBytes = base64Decoder.decode(scheduleItemDto.getAudioFile());
        Path filePath = Paths.get(Util.getFilePath(scheduleItemDto.getFileName()));
        if (!filePath.toFile().isFile()) {
            try {
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, decodedBytes);
            } catch (IOException exc) {
                log.error("Can't save file into: {}", filePath, exc);
                throw new SaveException(exc);
            }
        }
        scheduleItemDto.setAudioPath(scheduleItemDto.getFileName());
        deletePreviousAudio(scheduleItemDto.getId());
    }

    private void deletePreviousAudio(String itemId) {
        scheduleRepo.findById(itemId)
                .map(Util::getScheduleAudioPath)
                .map(Paths::get)
                .ifPresent(path -> applyFuncWrappingExc(Files::deleteIfExists, path));
    }
}
