package com.androidghost77.schoolbell.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.androidghost77.schoolbell.model.ExceptionDay;

public interface ExceptionDayRepo extends JpaRepository<ExceptionDay, String> {

    @Modifying
    @Query("DELETE FROM ExceptionDay  WHERE id in :ids")
    void deleteAllById(@Param("ids") List<String> exceptionDayIds);
}
