package com.androidghost77.schoolbell.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.androidghost77.schoolbell.model.Schedule;

public interface ScheduleRepo extends JpaRepository<Schedule, String> {

    List<Schedule> findAllByProfileName(String profileName);

    List<Schedule> findAllByProfileIsActive(boolean isActive);
}
