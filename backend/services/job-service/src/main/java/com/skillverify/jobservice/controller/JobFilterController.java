package com.skillverify.jobservice.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/api/job/filter")
@RequiredArgsConstructor
public class JobFilterController {
	
	@PostMapping("/test")
	public String test() {
		log.info("✅ JobFilterController test endpoint called");
		return "JobFilterController is working!";
	}

}
