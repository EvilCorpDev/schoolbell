package com.androidghost77.schedule;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Properties;
import java.util.Timer;
import java.util.TimerTask;
import java.util.stream.IntStream;

import com.androidghost77.player.Player;
import com.androidghost77.player.impl.AudioPlayer;

import lombok.RequiredArgsConstructor;

public class BellScheduler {

    private static final long DAY_MILLISECONDS = 5 * 60 * 1000L;

    public void schedule(Properties properties) {
        String bellSchedule = properties.getProperty("bell.schedule");
        String filePath = properties.getProperty("bell.path");
        String[] times = bellSchedule.split(",");
        IntStream.rangeClosed(1, times.length)
                .forEach(index -> scheduleTimer("timer " + index, times[index - 1], filePath, 20*1000L));
    }

    private void scheduleTimer(String name, String start, String filePath, long duration) {
        Timer timer = new Timer(name);

        LocalDateTime scheduleTime = LocalDateTime.of(LocalDate.now(), LocalTime.parse(start));
        LocalDateTime now = LocalDateTime.now();

        if(now.compareTo(scheduleTime) > 0) {
            scheduleTime = scheduleTime.plusDays(1);
        }

        Duration nextRun = Duration.between(LocalDateTime.now(), scheduleTime);
        long initialDelay = nextRun.getSeconds() * 1000L;

        timer.scheduleAtFixedRate(new PlayTask(duration, filePath), initialDelay, DAY_MILLISECONDS);
    }

    @RequiredArgsConstructor
    static class PlayTask extends TimerTask {

        private final long duration;
        private final String filePath;

        @Override
        public void run() {
            final Player player = new AudioPlayer();
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    player.play(filePath);
                }
            }, 0, DAY_MILLISECONDS);
            try {
                Thread.sleep(duration);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            player.stop();
        }
    }
}
