package com.androidghost77.schoolbell.rest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exceptions")
public class ExceptionsController {

    @PostMapping("/")
    public void saveExceptions() {

    }
}
