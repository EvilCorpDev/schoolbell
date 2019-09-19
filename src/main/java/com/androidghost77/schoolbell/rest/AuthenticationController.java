package com.androidghost77.schoolbell.rest;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.androidghost77.schoolbell.dto.JwtTokenDto;
import com.androidghost77.schoolbell.security.JwtTokenProvider;
import com.androidghost77.schoolbell.security.dto.UserPrincipal;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @PostMapping
    public JwtTokenDto authenticateUser(@RequestBody UserPrincipal userPrincipal) {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userPrincipal.getUsername(), userPrincipal.getPassword()));

        return new JwtTokenDto(tokenProvider.generateToken(authenticate));
    }
}
