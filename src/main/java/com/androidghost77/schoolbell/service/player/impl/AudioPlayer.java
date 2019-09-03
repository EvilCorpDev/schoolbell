package com.androidghost77.schoolbell.service.player.impl;

import java.io.File;

import com.androidghost77.schoolbell.service.player.Player;

import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;
import javafx.util.Duration;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AudioPlayer implements Player {

    private MediaPlayer mediaPlayer;

    public void play(String fileName, long startSec, Long duration) {
        Media hit = new Media(new File(fileName).toURI().toString());
        mediaPlayer = new MediaPlayer(hit);
        mediaPlayer.setStartTime(Duration.seconds(startSec));
        mediaPlayer.setOnReady(() -> {
            long actualDuration = duration == null ? (long) hit.getDuration().toSeconds() : duration;
            mediaPlayer.play();

            try {
                Thread.sleep(actualDuration * 1000);
            } catch (InterruptedException e) {
                log.warn("Sleep was interrupted", e);
                throw new RuntimeException(e);
            }
            mediaPlayer.stop();
        });
    }

    public void stop() {
        if (mediaPlayer != null) {
            mediaPlayer.stop();
        }
    }
}
