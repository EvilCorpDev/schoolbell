package com.androidghost77.schoolbell.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.androidghost77.schoolbell.dto.PlayNowDto;
import com.androidghost77.schoolbell.service.player.Player;
import com.androidghost77.schoolbell.utils.Util;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PlayController {

    private final Player player;

    @PostMapping("/play")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void playNow(@RequestBody PlayNowDto playNowDto) {
        player.playBase64(playNowDto.getAudioFile(), playNowDto.getStartSec(), playNowDto.getDuration());
    }

    @PostMapping("/play/default")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void playDefaultNow() {
        String defaultAudioUri = getClass().getClassLoader().getResource(Util.DEFAULT_AUDIO_FILE).toString();
        player.playUri(defaultAudioUri, 0L, 40L);
    }
}
