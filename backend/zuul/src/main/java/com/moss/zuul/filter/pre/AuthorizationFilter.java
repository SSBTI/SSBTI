package com.moss.zuul.filter.pre;

import com.moss.zuul.filter.commons.ZuulFilterType;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.exception.ZuulException;

public class AuthorizationFilter extends ZuulFilter {

    @Override
    public String filterType() {
        return ZuulFilterType.PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 1;
    }

    @Override
    public boolean shouldFilter() {
        return false;
    }

    @Override
    public Object run() throws ZuulException {
        return null;
    }
}
