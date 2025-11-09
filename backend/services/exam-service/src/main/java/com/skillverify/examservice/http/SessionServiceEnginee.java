package com.skillverify.examservice.http;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.skillverify.examservice.constant.SessionStatusEnum;
import com.skillverify.examservice.dto.SessionRequest;
import com.skillverify.examservice.dto.SessionResponseDTO;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j

public class SessionServiceEnginee {
	
	private final RestClient restClient;
    private final String sessionServiceUrl;

    public SessionServiceEnginee(RestClient restClient,
                       @Value("${session.service.url}") String sessionServiceUrl) {
        this.restClient = restClient;
        this.sessionServiceUrl = sessionServiceUrl;
    }
	
	public ResponseEntity<SessionResponseDTO> getSessionInfo(SessionRequest session) {
		log.info("🔗 Making HTTP call to Session Service to get session info");
		
		ResponseEntity<SessionResponseDTO> response = restClient.post()
				.uri(sessionServiceUrl+"/initiate")
				.body(session)
				.retrieve()
				.toEntity(SessionResponseDTO.class);
		
		
		log.info("✅ Received response from Session Service: {}", response.getBody());
		
		
		return response;
	}
	
	

}
