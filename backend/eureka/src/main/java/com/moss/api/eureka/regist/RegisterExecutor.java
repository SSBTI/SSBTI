package com.moss.api.eureka.regist;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class RegisterExecutor {

    private final ExecutorService tPool = Executors.newFixedThreadPool(3);

    @Value("${eurekaPath}")
    private String eurekaPath;

    @Value("${kubeConfigPath}")
    private String kubeConfigPath;

    public void register(){
        RegisterTask task = new RegisterTask(eurekaPath, kubeConfigPath);
        tPool.execute(task);
    }
}
