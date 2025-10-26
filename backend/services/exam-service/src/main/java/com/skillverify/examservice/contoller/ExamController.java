package com.skillverify.examservice.contoller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.examservice.dto.ExamInitiateReqDto;
import com.skillverify.examservice.dto.ExamInitiateResDto;
import com.skillverify.examservice.service.ExamService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/exams")
@Slf4j
@RequiredArgsConstructor

public class ExamController {
	
	private final ExamService examService;
	
	
	@PostMapping("/initiate")
	public ResponseEntity<ExamInitiateResDto> initiateExam(@Valid @RequestBody ExamInitiateReqDto examInitiateReqDto) {
		log.info("✅ Exam initiation request received for userId:{}",examInitiateReqDto.getUserId());
	 ExamInitiateResDto response =	examService.initiateExam(examInitiateReqDto);
		log.info("✅ Exam initiation completed for examId:{}",response.getExamId());
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

}
