package com.androidghost77.schoolbell.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.androidghost77.schoolbell.model.Schedule;

public interface ScheduleRepo extends JpaRepository<Schedule, String> {

    List<Schedule> findAllByProfileName(String profileName);

    List<Schedule> findAllByProfileIsActive(boolean isActive);

    @Modifying
    void deleteAllById(List<String> ids);

    @Modifying
    @Query("DELETE FROM Schedule WHERE profile.id in :profileIds")
    void deleteAllByProfileId(@Param("profileIds") List<String> profileIds);
}
