package com.androidghost77.schoolbell.security;

import java.util.Collections;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;

import com.androidghost77.schoolbell.model.User;
import com.androidghost77.schoolbell.repo.UserRepo;
import com.androidghost77.schoolbell.security.dto.UserPrincipal;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DbUserDetailsManager implements UserDetailsManager {

    private static final String DEFAULT_USER_NAME = "admin";
    private static final String DEFAULT_USER_PASS = "nimda";
    private final UserRepo userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        long usersInDb = userRepo.count();

        if (usersInDb == 0) {
            return new UserPrincipal(DEFAULT_USER_NAME, passwordEncoder.encode(DEFAULT_USER_PASS),
                    Collections.emptyList());
        }

        User dbUser = userRepo.findUserByUsername(username);
        if (dbUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(dbUser.getUsername(), dbUser.getPassword(), Collections.emptyList());
    }

    @Override
    public void createUser(UserDetails user) {
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
