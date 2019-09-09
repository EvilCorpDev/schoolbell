package com.androidghost77.schoolbell.schedule;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.stream.IntStream;

import org.springframework.util.CollectionUtils;

import com.androidghost77.schoolbell.dto.ExceptionItemDto;
import com.androidghost77.schoolbell.model.Schedule;
import com.androidghost77.schoolbell.service.player.Player;
import com.androidghost77.schoolbell.service.player.impl.AudioPlayer;
import com.androidghost77.schoolbell.utils.Util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
public class BellScheduler implements Scheduler<Schedule, ExceptionItemDto> {

    private static final long DAY_MILLISECONDS = 24 * 60 * 60 * 1000L;
    private static final List<Timer> timers = new ArrayList<>();

    @Override
    public void schedule(List<Schedule> scheduleList, List<ExceptionItemDto> exceptionItems) {
        if (CollectionUtils.isEmpty(scheduleList)) {
            return;
        }

        IntStream.rangeClosed(1, scheduleList.size())
                .forEach(index -> scheduleTimers(scheduleList, index, exceptionItems));
    }

    @Override
    public void stopSchedule() {
        timers.forEach(Timer::cancel);
        timers.clear();
    }

    private void scheduleTimers(List<Schedule> scheduleList, int index, List<ExceptionItemDto> exceptionItems) {
        Schedule schedule = scheduleList.get(index - 1);
        scheduleTimer("timer " + index, schedule.getTime(), Util.getScheduleAudioPath(schedule),
                schedule.getDuration(), schedule.getStartSec(), exceptionItems);
    }

    private void scheduleTimer(String name, String startTime, String trackPath, Long durationInSec, long startSec,
                               List<ExceptionItemDto> exceptionItems) {
        Timer timer = new Timer(name);

        LocalDateTime scheduleTime = LocalDateTime.of(LocalDate.now(), LocalTime.parse(startTime));
        LocalDateTime now = LocalDateTime.now();

        if (now.compareTo(scheduleTime) > 0) {
            scheduleTime = scheduleTime.plusDays(1);
        }

        Duration nextRun = Duration.between(LocalDateTime.now(), scheduleTime);
        long initialDelay = nextRun.getSeconds() * 1000L;

        timers.add(timer);
        timer.scheduleAtFixedRate(new PlayTask(durationInSec, startSec, trackPath, exceptionItems),
                initialDelay, DAY_MILLISECONDS);
    }

    @Slf4j
    @RequiredArgsConstructor
    private static class PlayTask extends TimerTask {

        private final Long durationInSec;
        private final long startSec;
        private final String trackPath;
        private final List<ExceptionItemDto> exceptionItems;

        @Override
        public void run() {
            if (todayIsExceptionDay()) {
                return;
            }
            Player player = new AudioPlayer();
            player.play(trackPath, startSec, durationInSec);
        }

        private boolean todayIsExceptionDay() {
            LocalDate today = LocalDate.now();
            return exceptionItems.stream()
                    .anyMatch(item -> compareExceptionDays(today, item));
        }

        private boolean compareExceptionDays(LocalDate today, ExceptionItemDto item) {
            if (item.getDayOfWeek() != null) {
                return today.getDayOfWeek().getValue() == item.getDayOfWeek();
            }
            return today.isEqual(item.getSpecificDay());
        }
    }
}
