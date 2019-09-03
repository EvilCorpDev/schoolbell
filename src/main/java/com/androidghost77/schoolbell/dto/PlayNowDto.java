package com.androidghost77.schoolbell.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayNowDto {

    private String audioFile;
    private Long duration;
    private long startSec;
}
