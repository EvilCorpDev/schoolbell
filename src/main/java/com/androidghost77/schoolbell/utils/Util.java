package com.androidghost77.schoolbell.utils;

import com.androidghost77.schoolbell.model.Schedule;
import com.androidghost77.schoolbell.service.func.ThrowingRunnable;

public final class Util {

    private static final String AUDIO_PATH = "./audio";

    private Util() {
    }

    public static String getFilePath(String fileName) {
        return String.format("%s/%s", AUDIO_PATH, fileName);
    }

    public static String getScheduleAudioPath(Schedule schedule) {
        return String.format("%s/%s", AUDIO_PATH, schedule.getAudioPath());
    }

    public static void applyRunnableWrappingExc(ThrowingRunnable runnable) {
        try {
            runnable.run();
        } catch (Exception exc) {
            throw new RuntimeException(exc);
        }
    }
}
