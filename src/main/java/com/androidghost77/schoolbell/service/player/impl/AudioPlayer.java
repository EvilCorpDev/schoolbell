package com.androidghost77.schoolbell.service.player.impl;

import java.io.File;

import com.androidghost77.schoolbell.service.player.Player;

import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;
import javafx.util.Duration;

public class AudioPlayer implements Player {

    private MediaPlayer mediaPlayer;

    public void play(String fileName, long startSec) {
        Media hit = new Media(new File(fileName).toURI().toString());
        mediaPlayer = new MediaPlayer(hit);
        mediaPlayer.setStartTime(Duration.seconds(startSec));
        mediaPlayer.play();
    }

    public void stop() {
        if(mediaPlayer != null) {
            mediaPlayer.stop();
        }
    }
}
