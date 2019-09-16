package com.androidghost77.schoolbell.utils;

import com.androidghost77.schoolbell.dto.ScheduleItemDto;
import com.androidghost77.schoolbell.model.Schedule;
import com.androidghost77.schoolbell.service.func.ThrowingFunction;
import com.androidghost77.schoolbell.service.func.ThrowingRunnable;

public final class Util {

    private static final String AUDIO_PATH = "./audio";
    private static final String AUDIO_PATH_TEMPLATE = "%s/%s";
    private static final String WINDOWS_AUTORUN_PATH = "C:\\Users\\%s\\AppData\\Roaming\\Microsoft\\Windows" +
            "\\Start Menu\\Programs\\Startup\\bell-schedule.jar.lnk";

    private Util() {
    }

    public static String getWindowsAutorunPath() {
        String userName = System.getProperty("user.name");
        return String.format(WINDOWS_AUTORUN_PATH, userName);
    }

    public static String getFilePath(String fileName) {
        return String.format(AUDIO_PATH_TEMPLATE, AUDIO_PATH, fileName);
    }

    public static String getScheduleAudioPath(ScheduleItemDto schedule) {
        return String.format(AUDIO_PATH_TEMPLATE, AUDIO_PATH, schedule.getAudioPath());
    }

    public static String getScheduleAudioPath(Schedule schedule) {
        return String.format(AUDIO_PATH_TEMPLATE, AUDIO_PATH, schedule.getAudioPath());
    }

    public static void applyRunnableWrappingExc(ThrowingRunnable runnable) {
        try {
            runnable.run();
        } catch (Exception exc) {
            throw new RuntimeException(exc);
        }
    }

    public static <T, R> R applyFuncWrappingExc(ThrowingFunction<T, R> function, T params) {
        try {
            return function.apply(params);
        } catch (Exception exc) {
            throw new RuntimeException(exc);
        }
    }
}
