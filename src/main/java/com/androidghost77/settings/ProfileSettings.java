package com.androidghost77.settings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
public class ProfileSettings {

    @JsonProperty("currentProfileName")
    private final String currentProfileName;
    @JsonProperty("profilePaths")
    private final Map<String, String> profilePaths;
}
