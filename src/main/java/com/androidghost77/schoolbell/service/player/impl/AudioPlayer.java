package com.androidghost77.schoolbell.service.player.impl;

import static com.androidghost77.schoolbell.utils.Util.applyRunnableWrappingExc;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;

import com.androidghost77.schoolbell.service.player.Player;

import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;
import javafx.util.Duration;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AudioPlayer implements Player {

    private MediaPlayer mediaPlayer;

    @Override
    public void play(String fileName, long startSec, Long duration) {
        Media hit = new Media(new File(fileName).toURI().toString());
        playMedia(startSec, duration, hit, null);
    }

    @Override
    public void playUri(String uri, long startSec, Long duration) {
        Media hit = new Media(uri);
        playMedia(startSec, duration, hit, null);
    }

    @Override
    public void playBase64(String base64Audio, long startSec, Long duration) {
        byte[] audioBytes = Base64.getDecoder().decode(base64Audio);
        try {
            File tempFile = File.createTempFile("Play", ".mp3", null);
            FileOutputStream fos = new FileOutputStream(tempFile);
            fos.write(audioBytes);
            fos.close();
            Media hit = new Media(tempFile.toURI().toString());
            playMedia(startSec, duration, hit, () -> applyRunnableWrappingExc(tempFile::delete));
        } catch (IOException exc) {
            log.error("Can't create tmp file", exc);
        }
    }

    private void playMedia(long startSec, Long duration, Media hit, Runnable callback) {
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
            if (callback != null) {
                callback.run();
            }
        });
    }

    @Override
    public void stop() {
        if (mediaPlayer != null) {
            mediaPlayer.stop();
        }
    }
}
