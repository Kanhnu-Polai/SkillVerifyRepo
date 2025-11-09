package com.skillverify.examservice.dto;

import java.util.UUID;

import com.skillverify.examservice.constant.SessionStatusEnum;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SessionRequest {
	

	private Long candidateId;
	private UUID applicationId;
	private String examId;
	private SessionStatusEnum status ;
	
	private int sessionDurationMinutes;
	
}
