package com.androidghost77.schoolbell.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.androidghost77.schoolbell.model.User;

public interface UserRepo extends JpaRepository<User, String> {

    User findUserByUsername(String userName);

    void deleteByUsername(String username);

    void deleteUsersByIdIn(List<String> userIds);
}
