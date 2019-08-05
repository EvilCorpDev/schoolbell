package com.androidghost77.schoolbell.schedule;

import java.util.List;

public interface Scheduler<T> {

    void schedule(List<T> scheduleList);

    void stopSchedule();
}
