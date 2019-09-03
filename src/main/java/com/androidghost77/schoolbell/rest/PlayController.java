package com.androidghost77.schoolbell.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.androidghost77.schoolbell.dto.PlayNowDto;
import com.androidghost77.schoolbell.service.player.Player;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PlayController {

    private final Player player;

    @PostMapping("/play")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void playNow(@RequestBody PlayNowDto playNowDto) {
        player.playBase64(playNowDto.getAudioFile(), playNowDto.getStartSec(), playNowDto.getDuration());
    }
}
