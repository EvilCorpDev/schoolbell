package com.androidghost77.schoolbell.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.androidghost77.schoolbell.model.User;

public interface UserRepo extends JpaRepository<User, Long> {

    User findUserByUsername(String userName);

    void deleteByUsername(String username);
}
