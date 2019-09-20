package com.androidghost77.schoolbell.security;

import static java.util.Collections.emptyList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;

import com.androidghost77.schoolbell.exceptions.UserNotFoundException;
import com.androidghost77.schoolbell.exceptions.UsernameAlreadyExistsException;
import com.androidghost77.schoolbell.model.User;
import com.androidghost77.schoolbell.repo.UserRepo;
import com.androidghost77.schoolbell.security.dto.UserPrincipal;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DbUserDetailsManager implements UserDetailsManager {

    private static final String DEFAULT_USER_NAME = "admin";
    private static final String DEFAULT_USER_PASS = "nimda";
    private static final Long DEFAULT_USER_ID = -1L;
    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) {
        long usersInDb = userRepo.count();

        if (usersInDb == 0) {
            return new UserPrincipal(DEFAULT_USER_ID, DEFAULT_USER_NAME, passwordEncoder.encode(DEFAULT_USER_PASS),
                    emptyList());
        }

        User dbUser = userRepo.findUserByUsername(username);
        if (dbUser == null) {
            throw new UsernameNotFoundException(String.format("Can't find user with username: %s", username));
        }
        return new UserPrincipal(dbUser.getId(), dbUser.getUsername(), dbUser.getPassword(), emptyList());
    }

    public UserDetails loadUserById(Long userId) {
        if (userId.equals(DEFAULT_USER_ID)) {
            return new UserPrincipal(DEFAULT_USER_ID, DEFAULT_USER_NAME, passwordEncoder.encode(DEFAULT_USER_PASS),
                    emptyList());
        }

        User userById = userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(String.format("Can't find user with id: %d", userId)));

        return new UserPrincipal(userById.getId(), userById.getUsername(), userById.getPassword(), emptyList());
    }

    @Override
    public void createUser(UserDetails user) {
        User existingUser = userRepo.findUserByUsername(user.getUsername());
        if (existingUser != null) {
            throw new UsernameAlreadyExistsException(String.format("Can't create user with username: %s, " +
                    "username already exists", user.getUsername()));
        }

        User dbUser = new User();
        dbUser.setUsername(user.getUsername());
        dbUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepo.save(dbUser);
    }

    @Override
    public void updateUser(UserDetails user) {
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public void deleteUser(String username) {
        userRepo.deleteByUsername(username);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public boolean userExists(String username) {
        return userRepo.findUserByUsername(username) != null;
    }
}
