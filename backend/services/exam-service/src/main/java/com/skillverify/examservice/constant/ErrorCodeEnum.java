package com.skillverify.examservice.constant;

public enum ErrorCodeEnum {
	
	INVALID_REQUEST("EXAM_SERVICE_1000", "Invalid request data"),
	EXAM_NOT_FOUND("EXAM_SERVICE_1001", "Exam not found"),
	USER_NOT_ELIGIBLE("EXAM_SERVICE_1002", "User is not eligible for the exam"),
	APPLICATION_NOT_FOUND("EXAM_SERVICE_1003","Provided apllication Id not found"),
	
	SERVER_ERROR("EXAM_SERVICE_1004", "Internal server error");

	private final String code;
	private final String message;

	ErrorCodeEnum(String code, String message) {
		this.code = code;
		this.message = message;
	}

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

}
