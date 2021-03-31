package com.moss.zuul.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(this.swaggerInfo())
                .select()
                .paths(PathSelectors.any())
                .build();

    }

    private ApiInfo swaggerInfo() {
        return new ApiInfoBuilder()
                .title("MoSS API")
                .description("MoSS의 API 문서입니다.")
                .version("0.1.0")
                .build();
    }
}
