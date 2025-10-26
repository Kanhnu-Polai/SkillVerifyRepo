package com.skillverify.userservice;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class HttpServiceEngine {

    private final RestClient restClient;
    private final String authServiceUrl = "/api/auth/update-email";

    public HttpServiceEngine(
            RestClient.Builder restClientBuilder,
            @Value("${auth.service.base-url}") String authServiceBaseUrl) {
        this.restClient = restClientBuilder
                .baseUrl(authServiceBaseUrl)
                .build();
        log.info("🔗 RestClient initialized with base URL: {}", authServiceBaseUrl);
    }

    public String updateEmailInAuthService(String oldEmail, String newEmail) {
        log.info("🔄 Initiating email update in Auth Service from {} to {}", oldEmail, newEmail);
        Map<String, String> requestBody = Map.of(
            "oldEmail", oldEmail,
            "newEmail", newEmail
        );

        try {
            ResponseEntity<Void> response = restClient.put()
                    .uri(authServiceUrl)
                    .body(requestBody)
                    .retrieve()
                    .toBodilessEntity();

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Auth service responded with error: " + response.getStatusCode());
            }

            log.info("✅ Successfully updated email in Auth Service from {} to {}", oldEmail, newEmail);
            return response.getStatusCode().toString();

        } catch (Exception e) {
            log.error("❌ Error updating email in Auth Service: {}", e.getMessage());
            throw new RuntimeException("❌ Failed to update email in Auth Service", e);
        }
    }
}