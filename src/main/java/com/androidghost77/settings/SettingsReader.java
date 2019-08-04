package com.androidghost77.settings;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class SettingsReader {

    public Properties readProperties(String filePath) throws IOException {
        Properties prop = new Properties();
        FileInputStream stream = new FileInputStream(new File(filePath));
        prop.load(stream);

        return prop;
    }
}
