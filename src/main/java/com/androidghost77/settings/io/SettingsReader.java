package com.androidghost77.settings.io;

import static com.androidghost77.utils.Constants.PROFILE_SETTINGS_PATH;

import com.androidghost77.settings.ProfileSettings;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

@RequiredArgsConstructor
public class SettingsReader {

    private final ObjectMapper objectMapper;

    public ProfileSettings readSettings() throws IOException {
        return objectMapper.readValue(new File(PROFILE_SETTINGS_PATH), ProfileSettings.class);
    }

    public Properties readProperties(String filePath) throws IOException {
        Properties prop = new Properties();
        try (FileInputStream stream = new FileInputStream(new File(filePath))) {
            prop.load(stream);
        }

        return prop;
    }
}
