package com.project.field.moss;

import com.project.field.moss.domain.Mbti;
import com.project.field.moss.domain.MbtiType;
import com.project.field.moss.repository.MbtiRepository;
import com.project.field.moss.service.MbtiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MossApplication {

	@Autowired
	private MbtiRepository mbtiRepository;

	public static void main(String[] args) {
		SpringApplication.run(MossApplication.class, args);
	}

}
