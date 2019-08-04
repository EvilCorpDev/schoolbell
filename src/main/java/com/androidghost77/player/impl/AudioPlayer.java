package com.androidghost77.player.impl;

import java.io.File;

import com.androidghost77.player.Player;

import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;

public class AudioPlayer implements Player {

    private MediaPlayer mediaPlayer;

    public void play(String fileName) {
        Media hit = new Media(new File(fileName).toURI().toString());
        mediaPlayer = new MediaPlayer(hit);
        mediaPlayer.play();
    }

    public void stop() {
        if(mediaPlayer != null) {
            mediaPlayer.stop();
        }
    }
}
