package com.moss.zuul.security;

public class AuthorizationPolicy {

    public static boolean authenticateRequest(String httpMethod, String path){


        return true;
    }
}
