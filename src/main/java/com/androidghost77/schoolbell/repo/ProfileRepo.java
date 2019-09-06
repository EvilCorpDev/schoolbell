package com.androidghost77.schoolbell.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.androidghost77.schoolbell.model.Profile;

public interface ProfileRepo extends JpaRepository<Profile, String> {

    @Query("SELECT name from Profile")
    List<String> getAllProfileNames();

    @Modifying
    @Query("DELETE FROM Profile where id in :ids")
    void deleteAllById(@Param("ids") List<String> ids);
}
