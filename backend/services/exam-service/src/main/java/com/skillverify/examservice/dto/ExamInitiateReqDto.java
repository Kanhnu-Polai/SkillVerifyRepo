package com.skillverify.examservice.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

public class ExamInitiateReqDto {

	
	@NotNull(message = "JobId ID cannot be null")
	private UUID jobId;
	
	@NotNull(message = "User ID cannot be null")
	private Long userId;
	
	@NotNull(message = "User email cannot be null")
	private String userEmail;
	

} 
