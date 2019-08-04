package com.androidghost77.rest;

import com.androidghost77.model.NewProfileSchedule;
import com.androidghost77.model.ScheduleItem;
import com.androidghost77.settings.io.SettingsReader;
import com.androidghost77.settings.io.SettingsWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final SettingsReader settingsReader;
    private final SettingsWriter settingsWriter;

    @GetMapping("/profile/{profileName}")
    public List<ScheduleItem> getProfileSchedule(@PathVariable("profileName") String profileName) {
        return Collections.emptyList();
    }

    @PostMapping("/profile")
    public void createProfileSchedule(@RequestBody NewProfileSchedule newProfileSchedule) {
        settingsWriter.saveProfile(newProfileSchedule);
    }
}
