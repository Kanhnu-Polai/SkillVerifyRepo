package com.skillverify.examservice.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ScheduleExamRequest {
	@NotNull(message = "Job ID is required")
	private UUID jobId;
	
	
	
	@Future(message = "Schedule time must be in the future")
	private LocalDateTime scheduleTime;
	
	
	private boolean examRequired = true;
	private boolean round2InterviewRequired = false;

}
