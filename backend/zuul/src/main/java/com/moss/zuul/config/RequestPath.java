package com.moss.zuul.config;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class RequestPath {
    private String httpMethod;
    private String path;
    private String role;

    public boolean isMatched(String httpMethod, String path, String role){
        if(httpMethod == null || path == null) throw new IllegalArgumentException();
        //HttpMethod 매칭
        if(!this.httpMethod.equals(httpMethod)) return false;
        //경로 매칭
        if(this.path.contains("**")){
            String rPath = this.path.replaceAll("[*]", "");
            if(!path.contains(rPath)) return false;
        }else if(!path.equals(this.path)) return false;
        
        //Role 매칭
        if(role != null && !role.equals(this.role)) return false;
        return true;
    }
}
