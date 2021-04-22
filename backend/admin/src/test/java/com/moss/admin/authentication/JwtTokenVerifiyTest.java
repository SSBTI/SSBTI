package com.moss.admin.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moss.admin.commons.AuthRequest;
import com.moss.admin.domain.User;
import com.moss.admin.domain.UserRole;
import com.moss.admin.repository.UserRepository;
import com.moss.admin.security.auth.UserDetailsImpl;
import com.moss.admin.security.jwt.JwtProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class JwtTokenVerifiyTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtProvider jwtProvider;

    @BeforeEach
    void init(){
        User user = User.builder()
                .userId("admin321")
                .password(passwordEncoder.encode("kim0580"))
                .role(UserRole.ADMIN)
                .build();
        userRepository.save(user);
    }

    @Test
    @DisplayName("토큰이 유효하면 200 반환")
    void verifyValidatedToken() throws Exception{
        //given
        String token = "Bearer " + jwtProvider.generateToken("admin321", "ROLE_ADMIN");

        //when
        ResultActions result = mockMvc.perform(get("/authentication")
                .header("Authorization", token));

        //then
        result
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @DisplayName("토큰이 유효하지 않으면 401 반환")
    void verifyInvalidatedToken() throws Exception{
        //given
        String token = "Bearer " + jwtProvider.generateToken("admin321", "ROLE_ADMIN");
        token += "s";
        //when
        ResultActions result = mockMvc.perform(get("/authentication")
                .header("Authorization", token));

        //then
        result
                .andExpect(status().isUnauthorized())
                .andDo(print());
    }
}
