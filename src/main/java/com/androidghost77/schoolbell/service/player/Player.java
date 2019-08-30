package com.androidghost77.schoolbell.service.player;

public interface Player {

    void play(String fileName, long startSec, long duration);

    void stop();
}
