package com.skillverify.profileinfoservice.http;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class HttpServiceEngine {

    private final RestClient restClient;

    public HttpServiceEngine(RestClient restClient) {
        this.restClient = restClient;
    }

    /**
     * Calls the User Service to increment profile view count for a given userId.
     * @param userId the ID of the user whose profile view count will be updated
     * @return ResponseEntity<String> containing success or error message
     */
    public ResponseEntity<String> callToUserServiceToUpdateProfileView(Long userId) {
        log.info("➡️ Calling User Service to update profile view for userId: {}", userId);

        try {
            // You can later replace this URL with service discovery (Eureka) or API Gateway endpoint
            String url = String.format("http://localhost:8083/api/users/update-profile-view?userId=%d", userId);

            ResponseEntity<String> response = restClient
                    .post()
                    .uri(url)
                    .retrieve()
                    .toEntity(String.class);

            log.info("✅ Response from User Service (status: {}): {}", 
                     response.getStatusCode(), response.getBody());

            return response;

        } catch (Exception e) {
            log.error("❌ Failed to update profile view for userId: {} | Error: {}", userId, e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while updating profile view for userId: " + userId);
        }
    }
}