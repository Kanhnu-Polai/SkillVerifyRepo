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

//	    List<FetchedJobDto> jobs = response.getBody();
//
//	    log.info("Jobs List: {}", jobs);
//	    log.info("[JobServiceEngine] job-service returned {} jobs",
//	             jobs != null ? jobs.size() : 0);
//	   
//
//	    return jobs != null ?
//	            ResponseEntity.ok(jobs) :
//	            ResponseEntity.status(404).body(List.of()); // return empty list if no jobs
	    return response;
	}
	
	
	
	

}
