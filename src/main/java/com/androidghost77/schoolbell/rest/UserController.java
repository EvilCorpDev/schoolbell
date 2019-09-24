package com.androidghost77.schoolbell.rest;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.androidghost77.schoolbell.dto.UserDto;
import com.androidghost77.schoolbell.enums.UserRole;
import com.androidghost77.schoolbell.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void saveUsers(@RequestBody List<UserDto> users) {
        userService.createOrUpdateUsers(users);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@RequestBody List<String> userIds) {
        userService.deleteUsers(userIds);
    }

    @GetMapping("/role")
    public List<String> getUserRoles() {
        return Arrays.stream(UserRole.values())
                .map(Enum::toString)
                .collect(Collectors.toList());
    }
}
