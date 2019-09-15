package com.androidghost77.schoolbell;

import java.awt.*;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import javax.imageio.ImageIO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.stage.Stage;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@EnableWebSecurity
@SpringBootApplication(exclude = {
        ThymeleafAutoConfiguration.class,
        UserDetailsServiceAutoConfiguration.class})
public class BellSchedulerApp extends Application {

    private static final String TRAY_ICON_PNG = "trayicon.png";

    private static String[] args;
    private static ConfigurableApplicationContext ctx;

    public static void main(String[] args) {
        BellSchedulerApp.args = args;
        Application.launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        addAppToTray();
        BellSchedulerApp.ctx = SpringApplication.run(BellSchedulerApp.class, BellSchedulerApp.args);
    }

    private void addAppToTray() {
        try {
            // ensure awt toolkit is initialized.
            Toolkit.getDefaultToolkit();

            if (!SystemTray.isSupported()) {
                log.info("No system tray support, application exiting.");
                Platform.exit();
            }

            SystemTray tray = SystemTray.getSystemTray();
            InputStream uri = getClass().getClassLoader().getResourceAsStream(TRAY_ICON_PNG);
            Image image = ImageIO.read(uri);
            TrayIcon trayIcon = new TrayIcon(image);
            trayIcon.setImageAutoSize(true);

            MenuItem exitItem = new MenuItem(new String("Вихід".getBytes(), StandardCharsets.UTF_8));
            exitItem.addActionListener(event -> {
                Platform.exit();
                tray.remove(trayIcon);
                int exitCode = SpringApplication.exit(ctx, () -> 0);
                System.exit(exitCode);
            });

            // setup the popup menu for the application.
            final PopupMenu popup = new PopupMenu();
            popup.add(exitItem);
            trayIcon.setPopupMenu(popup);

            // add the application tray icon to the system tray.
            tray.add(trayIcon);
        } catch (AWTException | IOException e) {
            log.warn("Unable to init system tray", e);
        }
    }

}
