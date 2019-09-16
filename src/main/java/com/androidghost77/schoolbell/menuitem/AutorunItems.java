package com.androidghost77.schoolbell.menuitem;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.androidghost77.schoolbell.exceptions.AutorunCreateItemException;
import com.androidghost77.schoolbell.exceptions.AutorunRemoveItemException;
import com.androidghost77.schoolbell.utils.Util;

import lombok.extern.slf4j.Slf4j;
import mslinks.ShellLink;

@Slf4j
public final class AutorunItems {

    private static final boolean ADD_AUTORUN_ENABLED = isAddAutorunEnabled();

    private AutorunItems() {
    }

    public static MenuItem createAutorunItem(String label, Integer removeItemIndex, PopupMenu popupMenu) {
        MenuItem addItem = new MenuItem(label);
        addItem.setEnabled(ADD_AUTORUN_ENABLED);
        addItem.addActionListener(listener -> {
            try {
                ShellLink autorunLink = ShellLink.createLink("./bell-schedule.jar");
                autorunLink.saveTo(Util.getWindowsAutorunPath());
                addItem.setEnabled(false);
                popupMenu.getItem(removeItemIndex).setEnabled(true);
            } catch (IOException exc) {
                log.error("Cant create autorun link, try in admin mode", exc);
                throw new AutorunCreateItemException("Cant create autorun link, try in admin mode", exc);
            }
        });
        return addItem;
    }

    public static MenuItem removeAutorunItem(String label, Integer addItemIndex, PopupMenu popupMenu) {
        Path pathToShortcut = Paths.get(Util.getWindowsAutorunPath());
        MenuItem removeItem = new MenuItem(label);
        removeItem.setEnabled(!ADD_AUTORUN_ENABLED);
        removeItem.addActionListener(listener -> {
            try {
                Files.deleteIfExists(pathToShortcut);
                removeItem.setEnabled(false);
                popupMenu.getItem(addItemIndex).setEnabled(true);
            } catch (IOException exc) {
                log.error("Cant remove autorun link, try in admin mode", exc);
                throw new AutorunRemoveItemException("Cant remove autorun link, try in admin mode", exc);
            }
        });
        return removeItem;
    }

    private static boolean isAddAutorunEnabled() {
        return !new File(Util.getWindowsAutorunPath()).exists();
    }
}
