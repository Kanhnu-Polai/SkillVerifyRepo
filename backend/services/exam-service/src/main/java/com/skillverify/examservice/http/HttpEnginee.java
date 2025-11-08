package com.skillverify.examservice.http;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.skillverify.examservice.constant.SessionStatusEnum;
import com.skillverify.examservice.dto.SessionRequest;
import com.skillverify.examservice.dto.SessionResponseDTO;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j

public class HttpEnginee {
	
	
	private final RestClient restClient;
	
	public HttpEnginee(RestClient restClient) {
		this.restClient = restClient;
	}
	
	// create job josn object to call session service
	
	
	
	public ResponseEntity<SessionResponseDTO> getSessionInfo(SessionRequest session) {
		log.info("🔗 Making HTTP call to Session Service to get session info");
		
		ResponseEntity<SessionResponseDTO> response = restClient.post()
				.uri("http://localhost:9096/api/v1/sessions/initiate")
				.body(session)
				.retrieve()
				.toEntity(SessionResponseDTO.class);
		
		
		log.info("✅ Received response from Session Service: {}", response.getBody());
		
		
		return response;
	}
	
	

}
