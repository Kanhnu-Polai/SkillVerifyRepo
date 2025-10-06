package com.skillverify.examservice.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
@Getter
@RequiredArgsConstructor
public enum ErrorCodeEnum {
	
	
	EXAM_ALREADY_SCHEDULED("5000", "Exam already scheduled for this job ID","EXAM_SERVICE"),
	JOB_NOT_FOUND("5001", "The specified job does not exist or is unavailable", "EXAM_SERVICE"),
	EXAM_NOT_FOUND("5002", "The exam you are trying to access does not exist.", "EXAM_SERVICE"),
	INVALIDE_TOKEN("5003", "Invalid or expired token", "EXAM_SERVICE"),
	EMAIL_REQUIRED("5004", "Email is required", "EXAM_SERVICE"),
	FAILED_TO_CALL_JOB_SERVICE("5005", "Failed to communicate with job-service","EXAM_SERVICE"),
	FAILED_TO_CALL_NOTIFICATION_SERVICE("5006", "Failed to communicate with notification-service","EXAM_SERVICE"),
	
	;
	
	
	
	

	private final String code;
    private final String message;
    private final String service;
}
