package com.androidghost77.schoolbell.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.androidghost77.schoolbell.dto.UserDto;
import com.androidghost77.schoolbell.model.User;
import com.androidghost77.schoolbell.repo.UserRepo;
import com.androidghost77.schoolbell.security.DbUserDetailsManager;
import com.androidghost77.schoolbell.security.dto.UserPrincipal;
import com.androidghost77.schoolbell.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final DbUserDetailsManager userDetailsManager;
    private final UserRepo userRepo;

    @Override
    public void createOrUpdateUsers(List<UserDto> userDtos) {
        userDtos.forEach(this::saveUser);
    }

    @Override
    @Transactional
    public void deleteUsers(List<String> userIds) {
        userRepo.deleteUsersByIdIn(userIds);
    }

    @Override
    public List<UserDto> getUsers() {
        return userRepo.findAll()
                .stream()
                .map(this::userToUserDto)
                .collect(Collectors.toList());
    }

    private void saveUser(UserDto user) {
        UserPrincipal userPrincipal = new UserPrincipal(user.getId(), user.getUsername(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole())));
        if (!user.isExisting()) {
            userDetailsManager.createUser(userPrincipal);
        } else {
            userDetailsManager.updateUserById(userPrincipal);
        }
    }

    private UserDto userToUserDto(User user) {
        return new UserDto(user.getId(), user.getUsername(), null, user.getRole().toString(), true);
    }
}
