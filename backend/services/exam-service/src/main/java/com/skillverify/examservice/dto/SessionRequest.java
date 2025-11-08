package com.skillverify.examservice.dto;

import com.skillverify.examservice.constant.SessionStatusEnum;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SessionRequest {
	

	private String candidateId;
	private String applicationId;
	private String examId;
	private SessionStatusEnum status ;
	
	private Long sessionDurationMinutes;
	
}
