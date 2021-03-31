package com.moss.zuul.config;

import java.util.List;

public interface SecurityConfig {
    final String GET = "GET";
    final String POST = "POST";
    final String PUT = "PUT";
    final String DELETE = "DELETE";

    void configure();
    List<RequestPath> getRequestPaths();
}
