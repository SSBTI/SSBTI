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
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Api(tags = {"1. Authentication"})
@RestController
@RequiredArgsConstructor
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
        UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUserId());
        final String token = jwtProvider.generateToken(userDetails);
        return ResponseEntity.ok().body(new AuthResponse(token));
    }

    @ApiOperation("토큰 유효성 검사")
    @GetMapping("/authentication")
    public ResponseEntity<String> checkAuthentication(){
        return ResponseEntity.ok().body("Valid Token");
    }

    //로그인 실패 에러 처리
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> badCredentialsExceptionHandler(BadCredentialsException e){
        ErrorResponse error = new ErrorResponse(e.getMessage(), "bad.credential.exception");
        logger.info("로그인 실패");
        return new ResponseEntity<ErrorResponse>(error, HttpStatus.UNAUTHORIZED);
    }

    //로그인 실패 에러 처리
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> usernameNotFoundExceptionHandler(UsernameNotFoundException e){
        ErrorResponse error = new ErrorResponse(e.getMessage(), "username.not.found.exception");
        logger.info("존재하지 않는 사용자");
        return new ResponseEntity<ErrorResponse>(error, HttpStatus.UNAUTHORIZED);
    }

    //ID, Pwd 검증시 에러 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        Map<String, String> errorResponse = new HashMap<>();
        e.getBindingResult().getAllErrors()
                .forEach(error->errorResponse.put(((FieldError) error).getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errorResponse);
    }

}
