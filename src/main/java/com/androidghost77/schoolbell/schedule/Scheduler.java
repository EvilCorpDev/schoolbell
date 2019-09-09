package com.androidghost77.schoolbell.schedule;

import java.util.List;

public interface Scheduler<T, E> {

    void schedule(List<T> scheduleList, List<E> exceptionItems);

    void stopSchedule();
}
