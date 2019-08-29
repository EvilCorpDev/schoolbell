package com.androidghost77.schoolbell.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.androidghost77.schoolbell.dto.ProfileScheduleDto;
import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.service.ProfileScheduleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ProfileScheduleService profileScheduleService;

    @GetMapping("/profile")
    public List<ProfileScheduleDto> getAllProfiles() {
        return profileScheduleService.getAllProfiles();
    }

    @GetMapping("/profile/{profileName}")
    public List<ScheduleItemDto> getProfileSchedule(@PathVariable("profileName") String profileName) {
        return profileScheduleService.getScheduleItems(profileName);
    }

    @PostMapping("/profile")
    public void saveProfileSchedule(@RequestBody List<ProfileScheduleDto> newProfileSchedule) {
        profileScheduleService.saveProfilesSchedule(newProfileSchedule);
        profileScheduleService.startScheduling(true);
    }

    @DeleteMapping("/profile")
    public void deleteProfiles(@RequestBody List<String> profileIds) {
        profileScheduleService.deleteProfiles(profileIds);
        profileScheduleService.startScheduling(true);
    }

    @DeleteMapping("/profile/bells")
    public void deleteScheduleItems(@RequestBody List<String> scheduleItemsIds) {
        profileScheduleService.deleteScheduleItems(scheduleItemsIds);
        profileScheduleService.startScheduling(true);
    }

    @PostMapping("/start")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void startScheduling(@RequestParam(name = "restart", defaultValue = "false") boolean restart) {
        profileScheduleService.startScheduling(restart);
    }

    @PostMapping("/stop")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void stopScheduling() {
        profileScheduleService.stopScheduling();
    }
}
