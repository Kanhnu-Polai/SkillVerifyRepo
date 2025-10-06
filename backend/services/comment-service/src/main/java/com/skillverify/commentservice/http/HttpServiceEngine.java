package com.skillverify.commentservice.http;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class HttpServiceEngine {

    private final RestClient restClient;

    @Value("${post.service.base-url}")
    private String postServiceUrl; // ❌ removed final

    public String callPostService(UUID postId) {
        log.info("✅ HttpServiceEngine: callPostService called for Post ID : {}", postId);

        ResponseEntity<String> response = restClient.put()
                .uri(postServiceUrl + "/update-post-comments?postId=" + postId)
                .retrieve()
                .toEntity(String.class);

        if (response != null) {
            log.info("✅ HttpServiceEngine: Response status: {}", response.getStatusCode());
            return response.getBody();
        } else {
            log.warn("⚠️ HttpServiceEngine: null response");
            return "Error calling Post Service";
        }
    }
}