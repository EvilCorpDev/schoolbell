package com.androidghost77.schoolbell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;

import javafx.application.Application;
import javafx.stage.Stage;

@SpringBootApplication(exclude = {
        SecurityAutoConfiguration.class,
        SecurityFilterAutoConfiguration.class,
        ThymeleafAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class})
public class BellSchedulerApp extends Application {

    private static String[] args;

    public static void main(String[] args) {
        BellSchedulerApp.args = args;
        Application.launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        SpringApplication.run(BellSchedulerApp.class, BellSchedulerApp.args);
    }
}
