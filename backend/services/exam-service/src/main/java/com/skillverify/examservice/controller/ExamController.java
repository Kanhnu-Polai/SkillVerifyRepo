package com.skillverify.examservice.controller;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exams")
@Slf4j
@CrossOrigin(origins = "*") 
public class ExamController {
	
	
	@PostMapping("/schedule")
	public String scheduleExam() {
		return "Exam scheduled successfully";
	}

  
       
}