package com.androidghost77.schoolbell.service;

public interface SchedulerService {

    void startScheduling(boolean restart);

    void stopScheduling();
}
