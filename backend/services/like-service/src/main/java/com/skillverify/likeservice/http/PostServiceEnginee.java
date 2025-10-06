package com.skillverify.likeservice.http;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class PostServiceEnginee {
	
	private final RestClient restClient;
	
	@Value("${post.service.base-url}")
	private String postServiceUrl;
	
	
	
	public void updatePostLikes( UUID postId, boolean isLiked) {
		log.info("✅ PostServiceEnginee: updatePostLikes called");
		
		try {
			
			ResponseEntity<String> response = restClient.put()
					.uri(postServiceUrl+"/update-post-likes")
					.contentType(MediaType.APPLICATION_JSON)
					.body("{\"postId\":\""+postId+"\",\"isLiked\":"+isLiked+"}")
					.retrieve()
					.toEntity(String.class);
			log.info("✅ PostServiceEnginee: updatePostLikes response: {}", response.getStatusCode());
			
			
		} catch (Exception e) {
				log.error("❌ PostServiceEnginee: updatePostLikes error: {}", e.getMessage());
				
		}
		
	}

}
