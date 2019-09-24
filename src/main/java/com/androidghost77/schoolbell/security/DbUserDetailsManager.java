package com.androidghost77.schoolbell.security;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;

import java.util.Optional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.util.StringUtils;

import com.androidghost77.schoolbell.enums.UserRole;
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
    private static final String DEFAULT_USER_ID = "default_id";
    private static final UserRole DEFAULT_USER_ROLE = UserRole.ADMIN;
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

    public UserDetails loadUserById(String userId) {
        if (userId.equals(DEFAULT_USER_ID)) {
            return new UserPrincipal(DEFAULT_USER_ID, DEFAULT_USER_NAME, passwordEncoder.encode(DEFAULT_USER_PASS),
                    singletonList(new SimpleGrantedAuthority(DEFAULT_USER_ROLE.toString())));
        }

        User userById = userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(String.format("Can't find user with id: %s", userId)));

        return new UserPrincipal(userById.getId(), userById.getUsername(), userById.getPassword(),
                singletonList(new SimpleGrantedAuthority(userById.getRole().toString())));
    }

    public void createUser(UserPrincipal user) {
        User existingUser = userRepo.findUserByUsername(user.getUsername());
        if (existingUser != null) {
            throw new UsernameAlreadyExistsException(String.format("Can't create user with username: %s, " +
                    "username already exists", user.getUsername()));
        }

        User dbUser = new User();
        dbUser.setId(user.getId());
        dbUser.setUsername(user.getUsername());
        dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
        dbUser.setRole(user.getUserRole());

        userRepo.save(dbUser);
    }

    @Override
    public void createUser(UserDetails user) {
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public void updateUser(UserDetails user) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void updateUserById(UserPrincipal userPrincipal) {
        Optional<User> existingUser = userRepo.findById(userPrincipal.getId());
        if (!existingUser.isPresent()) {
            throw new UserNotFoundException(String.format("Can't update user: %s", userPrincipal.getId()));
        }
        if (StringUtils.hasText(userPrincipal.getPassword())) {
            existingUser.get().setPassword(passwordEncoder.encode(userPrincipal.getPassword()));
        }
        existingUser.get().setUsername(userPrincipal.getUsername());
        existingUser.get().setRole(userPrincipal.getUserRole());

        userRepo.save(existingUser.get());
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
