package com.androidghost77.schoolbell.utils;

import com.androidghost77.schoolbell.model.Schedule;

public final class Util {

    private static final String AUDIO_PATH = "./audio";

    private Util() {
    }

    public static String getFilePath(String fileName, String fileExtension) {
        return String.format("%s/%s.%s", AUDIO_PATH, fileName, fileExtension);
    }

    public static String getScheduleAudioPath(Schedule schedule) {
        return String.format("%s/%s", AUDIO_PATH, schedule.getAudioPath());
    }
}
