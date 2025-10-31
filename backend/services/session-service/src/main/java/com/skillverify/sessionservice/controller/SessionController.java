package com.skillverify.sessionservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.sessionservice.dto.InitiateDto;
import com.skillverify.sessionservice.dto.SessionInitiateRespons;
import com.skillverify.sessionservice.entity.ExamSession;
import com.skillverify.sessionservice.service.SessionService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/sessions")
@Slf4j
@RequiredArgsConstructor
public class SessionController {
	
	
	private final SessionService sessionService;
	
	
	@GetMapping("/test")
	public String test() {
		log.info("Session service is up and running.");
		return "Session service is operational.";
	}
	
	
	
	@PostMapping("/initiate")
	public SessionInitiateRespons createSession(@RequestBody InitiateDto initiateDto) {
		log.info("✅ Initiate Session Request Received: {}", initiateDto.getExamId());
		SessionInitiateRespons session = sessionService.initiateSession(initiateDto);
		log.info("✅ Session Created with ID: {}", session.getSessionId());
		return session;
	}
	
	
	@PostMapping("/start")
	public String updateSession() {
		return "Update Session - To be implemented";
	}
	
	
	@GetMapping("/get")
	public String getSession() {
		return "Get Session - To be implemented";
	}

}
