package com.moss.zuul.security;

import com.moss.zuul.config.RequestPath;
import com.moss.zuul.config.SecurityConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SimpleAuthPolicy implements AuthorizationPolicy{

    private final SecurityConfig securityConfig;

    @Override
    public boolean authenticateRequest(String httpMethod, String path){
        List<RequestPath> list = securityConfig.getRequestPaths();
        return list.stream()
                .anyMatch(requestPath -> requestPath.isMatched(httpMethod, path, null));
    }

    @Override
    public boolean authenticateRequest(String httpMethod, String path, String role) {
        List<RequestPath> list = securityConfig.getRequestPaths();
        return list.stream()
                .anyMatch(requestPath -> requestPath.isMatched(httpMethod, path, role));
    }
}
