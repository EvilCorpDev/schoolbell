package com.androidghost77.schoolbell.service.player;

public interface Player {

    void play(String fileName, long startSec, Long duration);

    void playBase64(String base64Audio, long startSec, Long duration);

    void stop();
}
