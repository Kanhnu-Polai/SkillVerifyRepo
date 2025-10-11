package com.skillverify.postservice.http;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class HttpServiceEngine {

    private final RestClient restClient;
    private static final String LIKE_SERVICE_BASE_URL = "http://localhost:";
  

    public HttpServiceEngine(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl(LIKE_SERVICE_BASE_URL)
                .build();
    }

    public List<UUID> getLikedPostIdsByUserId(Long userId) {
        log.info("🔄 Fetching liked postIds for userId: {}", userId);

        try {
            // Call LikeService endpoint that returns List<UUID>
            @SuppressWarnings("unchecked")
			List<UUID> likedPostIds = restClient.get()
                    .uri("8091/api/v1/likes/get-post-id?userId={userId}", userId)
                    .retrieve()
                    .body(List.class);

            log.info("✅ Received liked posts: {}", likedPostIds);
            return likedPostIds;

        } catch (Exception e) {
            log.error("❌ Failed to fetch liked postIds for userId {}: {}", userId, e.getMessage());
            return List.of(); // Return empty list on error
        }
    }
    
    
    public ResponseEntity<String> callToUserServiceToUpdatePostCount(Long userId) {
        log.info("🔄 Calling userService to update post count for userId: {}", userId);

        try {
            // Using RestClient
            String response = restClient.post()
                    .uri("8083/api/users/update-post-count?userId={userId}" , userId)
                    .retrieve()
                    .body(String.class);
                   
            log.info("Response : {}",response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("❌ Failed to update post count for userId {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update post count");
        }
    }
}
