package com.androidghost77.schoolbell.service;

import java.util.List;

import com.androidghost77.schoolbell.dto.UserDto;

public interface UserService {

    void createOrUpdateUsers(List<UserDto> userDtos);

    void deleteUsers(List<String> userIds);

    List<UserDto> getUsers();
}
