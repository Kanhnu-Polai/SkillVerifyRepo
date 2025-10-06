package com.skillverify.questionservice.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class OptionResDto {
	
	private UUID optionId;
	private String optionText;
	private boolean isCorrect = false;
	 private UUID questionId;

}
