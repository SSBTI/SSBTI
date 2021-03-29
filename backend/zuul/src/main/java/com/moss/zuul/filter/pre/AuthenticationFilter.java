package com.moss.zuul.filter.pre;

import com.moss.zuul.filter.commons.FilterComponents;
import com.moss.zuul.filter.commons.ZuulFilterType;
import com.moss.zuul.filter.commons.ZuulHeaderType;
import com.moss.zuul.security.JwtProvider;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import io.jsonwebtoken.JwtException;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
public class AuthenticationFilter extends ZuulFilter {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final JwtProvider tokenProvider;

    @Override
    public String filterType() {
        return ZuulFilterType.PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        RequestContext context = RequestContext.getCurrentContext();
        String path = context.getRequest().getRequestURI();
        String type = context.getRequest().getMethod();

        if("POST".equals(type) && "/admin/login".equals(path)) return false;
        if("GET".equals(type) && path.contains("/review")) return false;

        return true;
    }

    @Override
    public Object run() throws ZuulException {

        RequestContext context = RequestContext.getCurrentContext();
        HttpServletRequest request = context.getRequest();
        String jwt = request.getHeader(ZuulHeaderType.AUTHENTICATION);
        String ip = request.getHeader("X-FORWARDED-FOR")!=null?request.getHeader("X-FORWARDED-FOR"):request.getRemoteAddr();

        if(jwt == null || !jwt.startsWith("Bearer ")){
            logger.info(String.format(FilterComponents.logFormat, ip, "invalid token"));
            throw new ZuulException("invalid token", 401, "invalid token");
        }

        String token = jwt.substring(7, jwt.length());

        try{
            String username = tokenProvider.extractUsername(token);
            String userRole = tokenProvider.extractUserAuthority(token);
        }
        catch (IllegalArgumentException e){
            logger.info(String.format(FilterComponents.logFormat, e.getMessage(), ip));
            throw new ZuulException(e, 400, e.getMessage());
        }
        catch (JwtException e){
            logger.info(String.format(FilterComponents.logFormat, e.getMessage(), ip));
            throw new ZuulException(e, 401, e.getMessage());
        }
        return null;
    }
}
