package com.androidghost77.schoolbell.logging;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.androidghost77.schoolbell.logging.request.CachingHttpServletRequestWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RequestResponseLoggingFilter implements Filter {

    private static final String BASE64_AUDIO_REGEX = "(\"audioFile\":\")(.)*(\"[,\\s}])";
    private static final String BASE_64_CONTENT_STUB = "{... base64 content here ...}";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        CachingHttpServletRequestWrapper requestWrapper = new CachingHttpServletRequestWrapper(request);
        logRequest(requestWrapper);
        logResponse(requestWrapper, (HttpServletResponse) response);
        chain.doFilter(requestWrapper, response);
    }

    private void logRequest(CachingHttpServletRequestWrapper request) {
        log.info("Incoming request, method: {}, path: {}, {} headers: {}{}", request.getMethod(), request.getRequestURI(),
                System.lineSeparator(), getRequestHeaders(request), getRequestPayload(request));
    }

    private void logResponse(HttpServletRequest request, HttpServletResponse response) {
        log.info("Outgoing response, status: {}, method: {}, path: {}, {} headers: {}", response.getStatus(),
                request.getMethod(), request.getRequestURI(), System.lineSeparator(), getResponseHeaders(response));
    }

    private Map<String, String> getRequestHeaders(CachingHttpServletRequestWrapper request) {
        Map<String, String> headers = new HashMap<>();
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            headers.put(headerName, headerValue);
        }

        return headers;
    }

    private Map<String, String> getResponseHeaders(HttpServletResponse response) {
        Map<String, String> headers = new HashMap<>();
        for(String headerName : response.getHeaderNames()) {
            headers.put(headerName, response.getHeader(headerName));
        }

        return headers;
    }

    private String getRequestPayload(CachingHttpServletRequestWrapper request) {
        return request.getContentLength() > 0 ?
                String.format(",%n payload: %s", hideBase64Content(request.getPayload())) : "";
    }

    private static String hideBase64Content(String payload) {
        Pattern pattern = Pattern.compile(BASE64_AUDIO_REGEX);
        Matcher matcher = pattern.matcher(payload);
        if(matcher.find()) {
            return new StringBuilder(payload)
                    .replace(matcher.end(1), matcher.start(3), BASE_64_CONTENT_STUB)
                    .toString();
        } else {
            return payload;
        }
    }

    public static void main(String[] args) {
        System.out.println(hideBase64Content("daspme, \"audioFile\":\"dasdadadadadad\", }"));
    }
}
