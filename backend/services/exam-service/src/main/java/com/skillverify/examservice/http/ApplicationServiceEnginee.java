package com.skillverify.examservice.http;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import com.skillverify.examservice.constant.ErrorCodeEnum;
import com.skillverify.examservice.dto.ApplicationServiceResponse;
import com.skillverify.examservice.exception.ApplicationNotFoundException;
import com.skillverify.examservice.exception.InternalServerError;

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

    public ResponseEntity<ApplicationServiceResponse> getApplicationId(String email, UUID jobId) {
        log.info("🔗 Making HTTP call to Application Service | email: {}, jobId: {}", email, jobId);

        try {
            ResponseEntity<ApplicationServiceResponse> response = restClient.get()
                    .uri(applicationServiceUrl + "/application/{email}/{jobId}", email, jobId)
                    .retrieve()
                    .toEntity(ApplicationServiceResponse.class);

            ApplicationServiceResponse body = response.getBody();

            if (body != null && Boolean.TRUE.equals(body.isFound())) {
                log.info("🏆 Application found: {}", body);
                return response;
            } else {
                log.warn("❌ Application not found for email: {} and jobId: {}", email, jobId);
                throw new ApplicationNotFoundException(ErrorCodeEnum.APPLICATION_NOT_FOUND);
            }

        } catch (HttpClientErrorException.NotFound e) {
            log.warn("❌ Application not found (404) from Application Service for email: {}, jobId: {}", email, jobId);
            throw new ApplicationNotFoundException(ErrorCodeEnum.APPLICATION_NOT_FOUND);
        } catch (Exception e) {
            log.error("🚨 Unexpected error while calling Application Service: {}", e.getMessage(), e);
            throw new InternalServerError(ErrorCodeEnum.SERVER_ERROR);
        }

        
    }
}