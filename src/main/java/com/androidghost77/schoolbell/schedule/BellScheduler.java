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

import com.androidghost77.schoolbell.model.ExceptionDay;
import com.androidghost77.schoolbell.model.Schedule;
import com.androidghost77.schoolbell.repo.ExceptionDayRepo;
import com.androidghost77.schoolbell.service.player.Player;
import com.androidghost77.schoolbell.service.player.impl.AudioPlayer;
import com.androidghost77.schoolbell.utils.Util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
public class BellScheduler implements Scheduler<Schedule> {

    private static final long DAY_MILLISECONDS = 24 * 60 * 60 * 1000L;
    private static final List<Timer> timers = new ArrayList<>();

    private final ExceptionDayRepo exceptionDayRepo;

    @Override
    public void schedule(List<Schedule> scheduleList) {
        if (CollectionUtils.isEmpty(scheduleList)) {
            return;
        }

        IntStream.rangeClosed(1, scheduleList.size())
                .forEach(index -> scheduleTimers(scheduleList, index));
    }

    @Override
    public void stopSchedule() {
        timers.forEach(Timer::cancel);
        timers.clear();
    }

    private void scheduleTimers(List<Schedule> scheduleList, int index) {
        Schedule schedule = scheduleList.get(index - 1);
        scheduleTimer("timer " + index, schedule.getTime(), Util.getScheduleAudioPath(schedule),
                schedule.getDuration(), schedule.getStartSec());
    }

    private void scheduleTimer(String name, String startTime, String trackPath, long durationInSec, long startSec) {
        Timer timer = new Timer(name);

        LocalDateTime scheduleTime = LocalDateTime.of(LocalDate.now(), LocalTime.parse(startTime));
        LocalDateTime now = LocalDateTime.now();

        if (now.compareTo(scheduleTime) > 0) {
            scheduleTime = scheduleTime.plusDays(1);
        }

        Duration nextRun = Duration.between(LocalDateTime.now(), scheduleTime);
        long initialDelay = nextRun.getSeconds() * 1000L;

        timers.add(timer);
        timer.scheduleAtFixedRate(new PlayTask(durationInSec, startSec, trackPath, exceptionDayRepo),
                initialDelay, DAY_MILLISECONDS);
    }

    @Slf4j
    @RequiredArgsConstructor
    private static class PlayTask extends TimerTask {

        private final long durationInSec;
        private final long startSec;
        private final String trackPath;
        private final ExceptionDayRepo exceptionDayRepo;

        @Override
        public void run() {
            if (todayIsExceptionDay()) {
                return;
            }
            Player player = new AudioPlayer();
            player.play(trackPath, startSec, durationInSec);
            try {
                Thread.sleep(durationInSec * 1000);
            } catch (InterruptedException e) {
                log.warn("Sleep was interrupted", e);
                throw new RuntimeException(e);
            }
            player.stop();
        }

        private boolean todayIsExceptionDay() {
            LocalDate today = LocalDate.now();
            return exceptionDayRepo.findAll()
                    .stream()
                    .anyMatch(item -> compareExceptionDays(today, item));
        }

        private boolean compareExceptionDays(LocalDate today, ExceptionDay item) {
            if (item.isRepeatable()) {
                return today.getDayOfWeek().getValue() == item.getDayOfWeek();
            }
            return today.isEqual(item.getSpecificDay());
        }
    }
}
