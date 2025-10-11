package com.skillverify.likeservice.contants;

public enum ErrorCodeEnum {
	
	USER_NOT_PROVIDED_EXCEPTION("LIKE_SERVICE_001", "In the request userId is not provided"),
	LIKE_NOT_FOUND("LIKE_SERVICE_002", "Like not found"),
	DATABASE_ERROR("LIKE_SERVICE_003", "Database error occurred"),
	UNAUTHORIZED_ACTION("LIKE_SERVICE_004", "Unauthorized action"),
	SERVICE_UNAVAILABLE("LIKE_SERVICE_005", "Service is currently unavailable");
	
	private final String errorCode;
	private final String errorMessage;
	
	ErrorCodeEnum(String errorCode, String errorMessage) {
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
	
	public String getCode() {
		return errorCode;
	}
	
	public String getMessage() {
		return errorMessage;
	}

}
