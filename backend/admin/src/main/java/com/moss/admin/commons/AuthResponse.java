package com.moss.admin.commons;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AuthResponse {
    private String accessToken;
    public AuthResponse(String token){
        this.accessToken = "Bearer " + token;
    }
}
