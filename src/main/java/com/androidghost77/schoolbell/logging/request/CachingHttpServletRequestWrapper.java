package com.androidghost77.schoolbell.logging.request;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.apache.commons.io.IOUtils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public class CachingHttpServletRequestWrapper extends HttpServletRequestWrapper {

    private String payload;

    /**
     * Constructs a request object wrapping the given request.
     *
     * @param request The request to wrap
     * @throws IllegalArgumentException if the request is null
     */
    public CachingHttpServletRequestWrapper(ServletRequest request) {
        super((HttpServletRequest) request);
        try (InputStream inputStream = request.getInputStream()) {
            this.payload = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
        } catch (IOException exc) {
            log.error("Can't read from stream", exc);
        }
    }

    @Override
    public ServletInputStream getInputStream() throws IOException {
        return new SimpleServletInputStream(new ByteArrayInputStream(payload.getBytes()));
    }

    @RequiredArgsConstructor
    private static class SimpleServletInputStream extends ServletInputStream{

        private final ByteArrayInputStream inputStream;

        @Override
        public boolean isFinished() {
            return this.inputStream.available() == 0;
        }

        @Override
        public boolean isReady() {
            return true;
        }

        @Override
        public void setReadListener(ReadListener listener) {
            throw new UnsupportedOperationException("Not implemented");
        }

        @Override
        public int read() throws IOException {
            return inputStream.read();
        }
    }
}
