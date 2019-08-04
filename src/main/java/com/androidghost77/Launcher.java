package com.androidghost77;

import com.androidghost77.schedule.BellScheduler;
import com.androidghost77.settings.SettingsReader;

import javafx.application.Application;
import javafx.stage.Stage;

public class Launcher extends Application {

    private static String propertiesPath = "/Users/androidghost77/dev/schoollbell/src/main/resources/application.properties";

    public void start(Stage primaryStage) throws Exception {
        SettingsReader reader = new SettingsReader();
        BellScheduler scheduler = new BellScheduler();
        scheduler.schedule(reader.readProperties(propertiesPath));
    }

    public static void main(String[] args) {
        if(args.length > 0) {
            propertiesPath = args[0];
        }
        Application.launch(args);
    }

    //TODO: don't stop music second time
    //TODO: add exception days
    //TODO: configure duration
}
