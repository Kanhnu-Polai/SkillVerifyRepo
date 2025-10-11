package com.skillverify.profileinfoservice.contants;

public enum ErrorCodeEnum {
	
	USER_ID_NOT_PROVIDED("USER_ID_NOT_PROVIDED","User id is not provided"),
	PROFILE_NOT_FOUND("PROFILE_NOT_FOUND","Profile not found for the given user id");
	
	private String code;
	private String message;
	
	private ErrorCodeEnum(String code, String message) {
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
