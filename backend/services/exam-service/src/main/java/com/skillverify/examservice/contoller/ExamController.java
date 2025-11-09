package com.skillverify.examservice.contoller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
@CrossOrigin( origins  ="http://localhost:5173")

public class ExamController {
	
	private final ExamService examService;
	
	
	@PostMapping(value = "/initiate", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<ExamInitiateResDto> initiateExam(
	        @Valid @RequestPart("data") ExamInitiateReqDto examInitiateReqDto,
	        @RequestPart(value = "file", required = false) MultipartFile file
	) {
	    log.info("✅ Exam initiation request received for userId: {}", examInitiateReqDto.getUserId());
	    log.info("📦 Received file: {}", file != null ? file.getOriginalFilename() : "❌ No file received");
	    ExamInitiateResDto response = examService.initiateExam(examInitiateReqDto, file);
	    log.info("✅ Exam initiation completed for examId: {}", response.getExamId());
	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
}
