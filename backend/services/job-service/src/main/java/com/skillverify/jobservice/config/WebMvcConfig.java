package com.skillverify.jobservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig {
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			 @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**") // allow all endpoints
	                        .allowedOrigins("https://7mp23sv4-5173.inc1.devtunnels.ms") // your frontend Dev Tunnel URL
	                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                        .allowedHeaders("*");
	            }
		};
	}

}
