package com.moss.admin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .ignoredParameterTypes(Authentication.class)
                .apiInfo(this.swaggerInfo())
                .select()
                .paths(or(regex("/.*")))
                .build();

    }

    private ApiInfo swaggerInfo() {
        return new ApiInfoBuilder()
                .title("MoSS Admin API")
                .description("MoSS의 Admin API 문서입니다.")
                .version("0.1.0")
                .build();
    }
}

