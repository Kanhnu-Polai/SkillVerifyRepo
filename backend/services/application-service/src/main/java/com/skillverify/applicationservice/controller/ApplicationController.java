package com.skillverify.applicationservice.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.applicationservice.dto.ApplicationIDFoundResponse;
import com.skillverify.applicationservice.dto.JobApplyDto;
import com.skillverify.applicationservice.dto.JobApplyResponseDto;
import com.skillverify.applicationservice.service.JobApplicationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/applications")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin( origins = "http://localhost:5173")
public class ApplicationController {
	
	
	private final JobApplicationService jobApplicationService;
	
	@PostMapping("/apply")
	public ResponseEntity<JobApplyResponseDto>  applyJob(@RequestBody JobApplyDto jobApplyDto) {
		log.info("✅ Received job application: {}", jobApplyDto);
		
		if (jobApplyDto.getJobSeekerEmail() == null || jobApplyDto.getResumeUrl() == null || jobApplyDto.getJobId() == null) {
			log.error("Invalid application data: {}", jobApplyDto);
			return ResponseEntity.badRequest().body(null);
		}
		
		try {
			JobApplyResponseDto responseDto 	=	jobApplicationService.applyForJob(jobApplyDto);
			log.info("✅ Job application processed successfully for email: {}", jobApplyDto.getJobSeekerEmail());
			return ResponseEntity.ok(responseDto);
			
		} catch (Exception e) {
			log.error("Error applying for job: {}", e.getMessage());
			return ResponseEntity.status(500).body(null);
		}
		
	
	
	}
	
	
	
	@GetMapping("/get-application")
	public String getApplicationById() {
		return "Application details for the given ID";
	}
	
	
	@GetMapping("/by-user/{email}")
	public ResponseEntity<?> getApplicationsByUserEmail(@PathVariable String email) {
		log.info("Fetching applications for user with email: {}", email);
		// Here you would typically call a service method to fetch applications by email
		// For now, returning a placeholder response
	 ResponseEntity<?> jobs =	jobApplicationService.getJobApplicationIdByEmail(email);
		return ResponseEntity.ok(jobs);
	}
	
	@GetMapping("/{applicationId}")
	public String getAllApplications( @PathVariable String applicationId) {
		return "List of all applications";
	}
	
	@GetMapping("/application/{email}/{jobId}")
	public ResponseEntity<?> getApplicationIdByEmailAndJobId( @PathVariable String email,@PathVariable UUID jobId){
		log.info("Received request to find applicaton Id for user : {}",email);
		
		ResponseEntity<ApplicationIDFoundResponse> response = jobApplicationService.getApplicationByEmailAndJobId(email, jobId);
		return  response;
	}

}
