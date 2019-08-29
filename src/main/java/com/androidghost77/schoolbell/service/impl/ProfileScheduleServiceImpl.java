package com.androidghost77.schoolbell.service.impl;

import static java.util.stream.Collectors.toList;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
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
import com.androidghost77.schoolbell.repo.ProfileRepo;
import com.androidghost77.schoolbell.repo.ScheduleRepo;
import com.androidghost77.schoolbell.schedule.Scheduler;
import com.androidghost77.schoolbell.service.ProfileScheduleService;
import com.androidghost77.schoolbell.service.func.ThrowingFunction;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class ProfileScheduleServiceImpl implements ProfileScheduleService {

    private final ProfileRepo profileRepo;
    private final ScheduleRepo scheduleRepo;
    private final ScheduleMapper scheduleMapper;
    private final ProfileMapper profileMapper;
    private final Scheduler<Schedule> bellScheduler;
    private final Base64.Decoder base64Decoder = Base64.getMimeDecoder();

    private static final String AUDIO_PATH = "./audio";

    @Override
    public List<ScheduleItemDto> getScheduleItems(String profileName) {
        return scheduleRepo.findAllByProfileName(profileName)
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
    @Transactional
    public void deleteProfiles(List<String> profileIds) {
        scheduleRepo.deleteAllByProfileId(profileIds);
        profileRepo.deleteAllById(profileIds);
    }

    @Override
    @Transactional
    public void deleteScheduleItems(List<String> scheduleItemsIds) {
        scheduleRepo.deleteAllById(scheduleItemsIds);
    }

    @Override
    public void startScheduling(boolean restart) {
        if (restart) {
            stopScheduling();
        }

        bellScheduler.schedule(scheduleRepo.findAllByProfileIsActive(true));
    }

    @Override
    public void stopScheduling() {
        bellScheduler.stopSchedule();
    }

    private void saveScheduleItems(List<ScheduleItemDto> scheduleItemDtos, Profile savedProfile) {
        List<Schedule> scheduleList = scheduleItemDtos.stream()
                .peek(this::saveAudioFile)
                .map(scheduleMapper::dtoToSchedule)
                .peek(item -> item.setProfile(savedProfile))
                .collect(toList());
        scheduleRepo.saveAll(scheduleList);
    }

    private void saveAudioFile(ScheduleItemDto scheduleItemDto) {
        if (StringUtils.isEmpty(scheduleItemDto.getAudioFile())) {
            return;
        }

        byte[] decodedBytes = base64Decoder.decode(scheduleItemDto.getAudioFile());
        String fileName = UUID.randomUUID().toString();
        Path filePath = Paths.get(getFilePath(fileName, scheduleItemDto.getFileExtension()));
        try {
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, decodedBytes);
        } catch (IOException exc) {
            log.error("Can't save file into: {}", filePath, exc);
            throw new SaveException(exc);
        }
        scheduleItemDto.setAudioPath(String.format("%s.%s", fileName, scheduleItemDto.getFileExtension()));
        deletePreviousAudio(scheduleItemDto.getId());
    }

    private void deletePreviousAudio(String itemId) {
        scheduleRepo.findById(itemId)
                .map(schedule -> String.format("%s/%s", AUDIO_PATH, schedule.getAudioPath()))
                .map(Paths::get)
                .ifPresent(path -> applyFuncWrappingExc(Files::deleteIfExists, path));
    }

    private <T, R> R applyFuncWrappingExc(ThrowingFunction<T, R> function, T params) {
        try {
            return function.apply(params);
        } catch (Exception exc) {
            throw new RuntimeException(exc);
        }
    }

    private String getFilePath(String fileName, String fileExtension) {
        return String.format("%s/%s.%s", AUDIO_PATH, fileName, fileExtension);
    }
}
