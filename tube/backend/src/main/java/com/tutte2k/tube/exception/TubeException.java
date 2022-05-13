package com.tutte2k.tube.exception;

public class TubeException extends RuntimeException {
    public TubeException(String message) {
        super(message);
    }

    public TubeException(String message, Exception exception) {
        super(message, exception);
    }
}
