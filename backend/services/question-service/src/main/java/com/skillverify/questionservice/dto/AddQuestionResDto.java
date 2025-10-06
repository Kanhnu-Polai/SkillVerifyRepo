package com.skillverify.questionservice.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class AddQuestionResDto {
	private UUID questionId;
	private String type;

	private String question;

	private String difficulty;

	private String category;

	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	private List<OptionResDto> options = new ArrayList<>();

}
