package com.skillverify.questionservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.questionservice.dto.AddQuestionDto;
import com.skillverify.questionservice.dto.AddQuestionResDto;
import com.skillverify.questionservice.service.QuestionService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/question")
@Slf4j
@RequiredArgsConstructor
public class QuestionController {
	
	
	private final QuestionService questionService;
	
	
	@PostMapping("/add_question")
	public ResponseEntity<AddQuestionResDto> addQuestion(@RequestBody AddQuestionDto addQuestionDto) {
		log.info("✅ Getting request to add a question with question: {}",addQuestionDto.getQuestion());
		AddQuestionResDto response = questionService.addQuestion(addQuestionDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	
	@GetMapping("/questions")
	public String getQuestions() {
		log.info("✅ Getting request to fetch questions");
		return "List of questions";
	}

}
