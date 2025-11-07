package com.skillverify.examservice.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

public class ExamInitiateReqDto {

	@NotNull(message = "Application ID cannot be null")
	private UUID applicationId;
	
	@NotNull(message = "Exam Detail ID cannot be null")
	private UUID examDetailId;
	
	@NotNull(message = "User ID cannot be null")
	private Long userId;
	

} 
