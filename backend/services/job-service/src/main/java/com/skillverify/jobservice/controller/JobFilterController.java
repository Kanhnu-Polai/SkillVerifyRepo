package com.skillverify.jobservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.jobservice.dto.JobFilterRequest;
import com.skillverify.jobservice.entity.Job;
import com.skillverify.jobservice.service.JobFilterService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/job/filter")
@RequiredArgsConstructor
public class JobFilterController {
	
	private final JobFilterService jobFilterService;
	
	@PostMapping("/test")
	public String test() {
		log.info("✅ JobFilterController test endpoint called");
		return "JobFilterController is working!";
	}
	
	
	@PostMapping("/filterJobs")
	public ResponseEntity<List<Job>> filterJobs(@RequestBody JobFilterRequest filterRequest) {
		log.info("✅ filterJobs endpoint called with filterRequest: {}", filterRequest);
		
		List<Job> jobs = jobFilterService.filterJobs(filterRequest);
		
		return ResponseEntity.ok(jobs);
	}

}
