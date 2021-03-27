package com.moss.api.eureka;

import com.moss.api.eureka.regist.RegisterExecutor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@EnableScheduling
@EnableEurekaServer
@SpringBootApplication
public class EurekaApplication {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private final RegisterExecutor registerExecutor;

	public EurekaApplication(RegisterExecutor registerExecutor){
		this.registerExecutor = registerExecutor;
	}

	@Scheduled(fixedDelay = 1000*2, initialDelay = 1000)
	public void serviceRegister(){
		try{
			registerExecutor.register();
		}catch (Exception e){
			logger.error("Failed to register service");
		}
	}

	public static void main(String[] args) throws Exception{
		SpringApplication.run(EurekaApplication.class, args);
	}
}
