package com.androidghost77.schoolbell.security;

import java.util.Date;
import java.util.Map;

import org.springframework.security.core.Authentication;

import com.androidghost77.schoolbell.security.dto.UserPrincipal;
import com.google.common.collect.ImmutableMap;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final String jwtSecret;
    private final int jwtExpirationInMs;

    private static final Map<Class<? extends RuntimeException>, String> EXCEPTION_MESSAGES = ImmutableMap.
            <Class<? extends RuntimeException>, String>builder()
            .put(SignatureException.class, "Invalid JWT signature")
            .put(MalformedJwtException.class, "Invalid JWT token")
            .put(ExpiredJwtException.class, "Expired JWT token")
            .put(UnsupportedJwtException.class, "Unsupported JWT token")
            .put(IllegalArgumentException.class, "JWT claims string is empty")
            .build();

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date issuedAt = new Date();
        Date expirationDate = new Date(issuedAt.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(userPrincipal.getId().toString())
                .setIssuedAt(issuedAt)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserIdFromJWT(String token) {
        Claims tokenBody = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return tokenBody.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (RuntimeException exc) {
            log.error(EXCEPTION_MESSAGES.get(exc.getClass()), exc);
        }
        return false;
    }
}
