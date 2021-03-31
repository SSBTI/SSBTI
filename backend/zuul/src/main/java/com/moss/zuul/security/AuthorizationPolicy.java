package com.moss.zuul.security;

public interface AuthorizationPolicy {
    boolean authenticateRequest(String httpMethod, String path);
    boolean authenticateRequest(String httpMethod, String path, String role);
}
