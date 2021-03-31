package com.moss.zuul;

import com.moss.zuul.config.SecurityConfig;
import com.moss.zuul.config.SecurityConfigImpl;
import com.moss.zuul.security.AuthorizationPolicy;
import com.moss.zuul.security.SimpleAuthPolicy;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class PathFilteringTest {

    AuthorizationPolicy authorizationPolicy;
    SecurityConfig securityConfig;

    @BeforeEach
    void setUp(){
        securityConfig = new SecurityConfigImpl();
        securityConfig.configure();

        authorizationPolicy = new SimpleAuthPolicy(securityConfig);
    }

    @Test
    @DisplayName("GET review는 모두 성공")
    void filtering() throws Exception{
        //given
        String path = "/review";
        String httpMethod = "GET";
        //when
        boolean result = authorizationPolicy.authenticateRequest(httpMethod, path);
        //then
        Assertions.assertThat(result).isTrue();
    }

    @Test
    @DisplayName("POST review는 실패")
    void filtering_fail() throws Exception{
        //given
        String path = "/review";
        String httpMethod = "POST";
        //when
        boolean result = authorizationPolicy.authenticateRequest(httpMethod, path);
        //then
        Assertions.assertThat(result).isFalse();
    }

    @Test
    @DisplayName("POST login 성공")
    void login() throws Exception{
        //given
        String path = "/admin/login";
        String httpMethod = "POST";
        //when
        boolean result = authorizationPolicy.authenticateRequest(httpMethod, path);
        //then
        Assertions.assertThat(result).isTrue();
    }

    @Test
    @DisplayName("기타 login 실패")
    void login_fail() throws Exception{
        //given
        String path = "/admin/login";
        String httpMethod = "GET";
        //when
        boolean result = authorizationPolicy.authenticateRequest(httpMethod, path);
        //then
        Assertions.assertThat(result).isFalse();
    }

    @Test
    @DisplayName("GET api-docs 성공")
    void api_docs() throws Exception{
        //given
        String path = "/admin/v2/api-docs";
        String httpMethod = "GET";
        //when
        boolean result = authorizationPolicy.authenticateRequest(httpMethod, path);
        //then
        Assertions.assertThat(result).isTrue();
    }

}
