package org.project.store_server.configuration;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${external.api.base.url}")
    private String externalApiBaseUrl;

    @Bean
    public WebClient webClient(){
        return WebClient.builder()
                .baseUrl(externalApiBaseUrl)
                .build();
    }
}
