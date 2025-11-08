package com.skillverify.sessionservice.dto;

import com.skillverify.sessionservice.contant.SessionStatusEnum;

import lombok.Data;
@Data

public class InitiateDto {
	
	private String candidateId;
	private String applicationId;
	private String examId;
	private SessionStatusEnum status ;
	
	private Long sessionDurationMinutes;
}
