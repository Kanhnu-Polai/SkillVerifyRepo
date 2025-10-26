package com.skillverify.postservice.http;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class HttpServiceEngine {

    private final RestClient restClient;

    // Load base URLs from application.yml or application.properties
    @Value("${like.service.base-url:http://like-service:8091}")
    private String likeServiceBaseUrl;

    @Value("${user.service.base-url:http://user-service:8083}")
    private String userServiceBaseUrl;

    public HttpServiceEngine(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    /**
     * 🔹 Fetch all liked post IDs for a specific user from LikeService
     */
    public List<UUID> getLikedPostIdsByUserId(Long userId) {
        log.info("🔄 Fetching liked postIds for userId: {}", userId);

        try {
            @SuppressWarnings("unchecked")
            List<UUID> likedPostIds = restClient.get()
                    .uri(likeServiceBaseUrl + "/api/v1/likes/get-post-id?userId={userId}", userId)
                    .retrieve()
                    .body(List.class);

            log.info("✅ Received liked posts: {}", likedPostIds);
            return likedPostIds;

        } catch (Exception e) {
            log.error("❌ Failed to fetch liked postIds for userId {}: {}", userId, e.getMessage());
            return List.of(); // Return empty list on error
        }
    }

    /**
     * 🔹 Call UserService to update post count when a new post is created
     */
    public ResponseEntity<String> callToUserServiceToUpdatePostCount(Long userId) {
        log.info("🔄 Calling userService to update post count for userId: {}", userId);

        try {
            String response = restClient.post()
                    .uri(userServiceBaseUrl + "/api/users/update-post-count?userId={userId}", userId)
                    .retrieve()
                    .body(String.class);

            log.info("✅ Response from user service: {}", response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("❌ Failed to update post count for userId {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update post count");
        }
    }
}