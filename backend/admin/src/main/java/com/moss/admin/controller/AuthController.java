package com.moss.admin.controller;

import com.moss.admin.commons.AuthRequest;
import com.moss.admin.commons.AuthResponse;
import com.moss.admin.commons.ErrorResponse;
import com.moss.admin.security.jwt.JwtProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = {"1. Authentication"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AuthController {

    private final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtProvider jwtProvider;
    
    @ApiOperation("관리자 로그인")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> createAuthentication(@RequestBody @Valid final AuthRequest authRequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUserId(), authRequest.getPassword())
        );
        logger.info("로그인 성공");
        final String token = jwtProvider.generateToken(authRequest.getUserId());
        return ResponseEntity.ok().body(new AuthResponse(token));
    }

    @ApiOperation("토큰 유효성 검사")
    @GetMapping("/authentication")
    public ResponseEntity<String> checkAuthentication(){
        return ResponseEntity.ok().body("Valid Token");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> badCredentialsExceptionHandler(BadCredentialsException e){
        ErrorResponse error = new ErrorResponse(e.getMessage(), "bad.credential.exception");
        logger.info("로그인 실패");
        return new ResponseEntity<ErrorResponse>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> usernameNotFoundExceptionHandler(UsernameNotFoundException e){
        ErrorResponse error = new ErrorResponse(e.getMessage(), "username.not.found.exception");
        logger.info("존재하지 않는 사용자");
        return new ResponseEntity<ErrorResponse>(error, HttpStatus.UNAUTHORIZED);
    }

}
