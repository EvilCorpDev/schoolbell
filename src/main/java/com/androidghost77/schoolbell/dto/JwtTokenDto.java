package com.androidghost77.schoolbell.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class JwtTokenDto {

    private String tokenType = "Bearer";
    private final String token;
}
