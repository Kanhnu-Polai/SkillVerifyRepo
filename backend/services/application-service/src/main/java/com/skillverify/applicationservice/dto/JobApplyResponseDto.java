package com.skillverify.applicationservice.dto;

import java.time.LocalDateTime;

import com.skillverify.applicationservice.constant.JobStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobApplyResponseDto {
	
	private String jobTitle;
	private JobStatus status; // e.g., "applied", "interviewed", "hired", "rejected"
	private LocalDateTime appliedAt;
	
	

}
