package com.androidghost77.schoolbell.exceptions;

public class SaveException extends RuntimeException {
    public SaveException(String message) {
        super(message);
    }

    public SaveException(Throwable cause) {
        super(cause);
    }
}
