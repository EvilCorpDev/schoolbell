package com.androidghost77.schoolbell.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.androidghost77.schoolbell.model.ExceptionDay;

public interface ExceptionDayRepo extends JpaRepository<ExceptionDay, String> {
}
