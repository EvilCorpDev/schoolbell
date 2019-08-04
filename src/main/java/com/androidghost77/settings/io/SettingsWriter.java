package com.androidghost77.settings.io;

import static com.androidghost77.utils.Constants.PROFILE_SETTINGS_PATH;

import com.androidghost77.model.NewProfileSchedule;
import com.androidghost77.settings.ProfileSettings;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RequiredArgsConstructor
public class SettingsWriter {

    private final ObjectMapper objectMapper;

    public void saveSettings(ProfileSettings profileSettings) throws IOException {
        try (FileOutputStream outputStream = new FileOutputStream(new File(PROFILE_SETTINGS_PATH))) {
            byte[] settingsBytes = objectMapper.writeValueAsBytes(profileSettings);
            outputStream.write(settingsBytes);
        }
    }

    public void saveProfile(NewProfileSchedule newProfileSchedule) {

    }
}
