package com.skillverify.applicationservice.http;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.skillverify.applicationservice.dto.ApplicationDto;
import com.skillverify.applicationservice.dto.FetchedJobDto;
import com.skillverify.applicationservice.dto.JobApplyDto;
import com.skillverify.applicationservice.dto.JobManagerAckDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JobServiceEngine {
	
	private final RestClient restClient;
	
	@Value("${job.service.base-url}")
	private String jobserviceBaseUrl ;
	
	
	public ResponseEntity<?> updateCandidateCount(UUID jobId) {
	
		log.info("Invoked makeCallToJobServiceToUpdateNoOfCandiateApply with jobId: {}", jobId);
		
		ResponseEntity<?> response = restClient
				.put()
				.uri(jobserviceBaseUrl+"/updateNumberCandidateApply/"+jobId)
				.retrieve()
				.toEntity(String.class);
		
		log.info("Response from job service: {}", response.getBody());
		
		return response;
	}
	
	
	
	public ResponseEntity<List<FetchedJobDto>> fetchJobsById(List<UUID> jobIds) {
	    log.info("[JobServiceEngine] fetchJobsById: {}", jobIds);

	    if (jobIds == null || jobIds.isEmpty()) {
	        log.warn("[JobServiceEngine] Empty jobIds list — skipping remote call");
	        return ResponseEntity.ok(List.of());
	    }

	    ResponseEntity<List<FetchedJobDto>> response = restClient
	            .post()
	            .uri(jobserviceBaseUrl + "/jobs/by-ids")
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(jobIds) // send jobIds list as JSON body
	            .retrieve()
	            .toEntity(new ParameterizedTypeReference<List<FetchedJobDto>>() {}); 

	    return response;
	}
	
	
	
	public ResponseEntity<String> makeCallToJobManagerServiceToAddApplication(JobManagerAckDto jobApplyDto) {
		log.info("📡 Making call to job manager service to add application for jobId: {} and application Id {}", jobApplyDto.getJobId(),jobApplyDto.getApplicationId() );


	    ResponseEntity<String> response = restClient
	            .post()
	            .uri("http://127.0.0.1:5000/application")
	            .contentType(MediaType.APPLICATION_JSON)
	            .body(jobApplyDto)
	            .retrieve()
	            .toEntity(String.class);

	    log.info("✅ Response from job manager service for applicationId {}: {}", jobApplyDto.getApplicationId(), response.getBody());
	    return response;
	}
	
	
	
	
	
	

}
