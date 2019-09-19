package com.androidghost77.schoolbell.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.androidghost77.schoolbell.repo.UserRepo;
import com.androidghost77.schoolbell.security.DbUserDetailsManager;
import com.androidghost77.schoolbell.security.JwtAuthenticationEntryPoint;
import com.androidghost77.schoolbell.security.JwtTokenProvider;
import com.androidghost77.schoolbell.security.filter.JwtAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DbUserDetailsManager userDetailsManager(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder) {
        return new DbUserDetailsManager(userRepo, passwordEncoder);
    }

    @Bean
    public JwtTokenProvider tokenProvider(@Value("${bell.schedule.jwt.secret}") String jwtSecret,
                                          @Value("${bell.schedule.jwt.expirationInMs}") int jwtExpirationInMs) {
        return new JwtTokenProvider(jwtSecret, jwtExpirationInMs);
    }

    @Bean
    public AuthenticationEntryPoint jwtAuthenticationEntryPoint() {
        return new JwtAuthenticationEntryPoint();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtTokenProvider tokenProvider,
                                                           DbUserDetailsManager userDetailsManager) {
        return new JwtAuthenticationFilter(tokenProvider, userDetailsManager);
    }
}
