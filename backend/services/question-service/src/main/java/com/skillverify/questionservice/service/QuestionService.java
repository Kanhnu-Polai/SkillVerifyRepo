package com.skillverify.questionservice.service;

import java.lang.module.ModuleDescriptor.Builder;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skillverify.questionservice.dto.AddQuestionDto;
import com.skillverify.questionservice.dto.AddQuestionResDto;
import com.skillverify.questionservice.entity.Option;
import com.skillverify.questionservice.entity.Question;
import com.skillverify.questionservice.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionService {
	
	private final QuestionRepository questionRepository;
	
	public AddQuestionResDto addQuestion(AddQuestionDto addQuestionDto) {
		log.info("✅ Trying to add question on database");
		log.info("✅ Mapping DTO to Entity");
		// 1️⃣ Build the question without options first
		Question question = Question.builder()
		        .type(addQuestionDto.getType())
		        .category(addQuestionDto.getCategory())
		        .question(addQuestionDto.getQuestion())
		        .difficulty(addQuestionDto.getDifficulty())
		        .createdAt(LocalDateTime.now())
		        .updatedAt(LocalDateTime.now())
		        .build();

		// 2️⃣ Map DTO options → Option entities
		List<Option> options = addQuestionDto.getOptions().stream().map(optDto -> {
		    return Option.builder()
		            .optionText(optDto.getOptionText())
		            .isCorrect(optDto.isCorrect())
		            .question(question) // Set parent relationship
		            .build();
		}).toList();

		// 3️⃣ Set the options to question
		question.setOptions(options);

		// 4️⃣ Save question (cascade will save options)
	Question response =	questionRepository.save(question);
	log.info("✅ Question added successfully with id: {}", response.getQuestionId());
	return mapToDto(response);
	
		
		
	}
	
	
	
	private AddQuestionResDto mapToDto(Question question) {
		AddQuestionResDto dto = new AddQuestionResDto();
		dto.setQuestionId(question.getQuestionId());
		dto.setType(question.getType());
		dto.setQuestion(question.getQuestion());
		dto.setCategory(question.getCategory());
		dto.setDifficulty(question.getDifficulty());
		dto.setCreatedAt(question.getCreatedAt());
		dto.setUpdatedAt(question.getUpdatedAt());
		return dto;
	}

}
