package com.moss.zuul.filter.route;

import com.moss.zuul.filter.commons.ZuulFilterType;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;



public class RouteFilter extends ZuulFilter {
    @Override
    public String filterType() {
        return ZuulFilterType.ROUTE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() throws ZuulException {
        RequestContext context = RequestContext.getCurrentContext();

        return null;
    }
}
