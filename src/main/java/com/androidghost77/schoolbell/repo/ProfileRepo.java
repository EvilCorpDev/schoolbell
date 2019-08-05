package com.androidghost77.schoolbell.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.androidghost77.schoolbell.model.Profile;

public interface ProfileRepo extends JpaRepository<Profile, String> {

    int countAllByIsActive(boolean isActive);
}
