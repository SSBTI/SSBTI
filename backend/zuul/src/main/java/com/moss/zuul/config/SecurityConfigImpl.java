package com.moss.zuul.config;


import com.moss.zuul.filter.error.ErrorFilter;
import com.moss.zuul.filter.pre.AuthenticationFilter;
import com.moss.zuul.security.JwtProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class SecurityConfigImpl implements SecurityConfig{
    private List<RequestPath> requestPaths = new ArrayList<>();

    @PostConstruct
    @Override
    public void configure(){
        requestPaths.add(RequestPath.builder().path("/review**").httpMethod(GET).build());
        requestPaths.add(RequestPath.builder().path("/admin/login").httpMethod(POST).build());
        requestPaths.add(RequestPath.builder().path("**/api-docs").httpMethod(GET).build());
        requestPaths.add(RequestPath.builder().path("**/swagger**").httpMethod(GET).build());
    }

    @Override
    public List<RequestPath> getRequestPaths() {
        return requestPaths;
    }
}
