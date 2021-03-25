package com.moss.api.eureka.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.provider.Serializer;
import lombok.Builder;

public class RegisterForm extends InstanceInfo{

    @JsonProperty("port")
    private Port port;

    private static class Port{
        @JsonProperty("$")
        private final int port;
        @JsonProperty("@enabled")
        private final boolean isEnabled;

        public Port(int port, boolean isEnabled){
            this.port  = port;
            this.isEnabled = isEnabled;
        }
    }

    public RegisterForm(InstanceInfo ii) {
        super(ii);
    }

    public void setPort(int port, boolean isEnabled){
        this.port = new Port(port, isEnabled);
    }
}
