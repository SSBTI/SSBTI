package com.moss.admin.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moss.admin.commons.AuthRequest;
import com.moss.admin.domain.User;
import com.moss.admin.domain.UserRole;
import com.moss.admin.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class LoginTest {

    @Autowired
    ObjectMapper mapper;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @BeforeEach
    void init(){
        User user = User.builder()
                .userId("admin123")
                .password(passwordEncoder.encode("12345"))
                .role(UserRole.ADMIN)
                .build();
        userRepository.save(user);
    }

    @Test
    @DisplayName("로그인 성공시 토큰과 200반환")
    void login_success() throws Exception{
        //given
        AuthRequest authRequest = new AuthRequest("admin123", "12345");
        String content = mapper.writeValueAsString(authRequest);
        //when
        ResultActions result = mockMvc.perform(post("/api/admin/login")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON));
        //then
        result
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andDo(print());
    }

    @Test
    @DisplayName("로그인 실패시 401반환")
    void login_fail() throws Exception{
        //given
        AuthRequest authRequest = new AuthRequest("admin123", "1245");
        String content = mapper.writeValueAsString(authRequest);
        //when
        ResultActions result = mockMvc.perform(post("/api/admin/login")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON));
        //then
        result
                .andExpect(status().isUnauthorized())
                .andDo(print());
    }
}
