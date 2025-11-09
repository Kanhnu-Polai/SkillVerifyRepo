package com.skillverify.sessionservice.dto;

import java.util.UUID;

import com.skillverify.sessionservice.contant.SessionStatusEnum;

import lombok.Data;
@Data

public class InitiateDto {
	
	private Long candidateId;
	private UUID applicationId;
	private UUID examId;
	private SessionStatusEnum status ;
	
	private Long sessionDurationMinutes;
}
