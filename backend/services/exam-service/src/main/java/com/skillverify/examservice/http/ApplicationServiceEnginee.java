package com.skillverify.examservice.http;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.skillverify.examservice.dto.ApplicationServiceResponse;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class ApplicationServiceEnginee {

    private final RestClient restClient;
    private final String applicationServiceUrl;

    public ApplicationServiceEnginee(RestClient restClient,
                                     @Value("${application.service.url}") String applicationServiceUrl) {
        this.restClient = restClient;
        this.applicationServiceUrl = applicationServiceUrl;
    }

    public  ResponseEntity<ApplicationServiceResponse> getApplicationId(String email, UUID jobId) {
        log.info("🔗 Making HTTP call to Application Service to get session info for email: {} and jobId: {}", email, jobId);

        ResponseEntity<ApplicationServiceResponse> response = restClient.get()
                .uri(applicationServiceUrl + "/application/{email}/{jobId}", email, jobId)
                .retrieve()
                .toEntity(ApplicationServiceResponse.class);

        log.info("✅ Received response from Application Service: {}", response.getBody());

        return response ;
    }
}