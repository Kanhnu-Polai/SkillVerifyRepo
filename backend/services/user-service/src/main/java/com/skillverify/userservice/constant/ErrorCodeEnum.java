package com.skillverify.userservice.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCodeEnum {
	INVALID_TOKEN_ERROR("USER_SERVICE_2000","Invalid token Exception"),
	TOKEN_VALIDATION_ERROR("USER_SERVICE_2001","Token Validation Error"),
	UNAUTHORIZED_ERROR("USER_SERVICE_2002","Unauthorised user"),
	RESUME_NOT_FOUND("USER_SERVICE_2003","Resume not found"),
	INVALID_PUBLIC_ID("USER_SERVICE_2004","Invalid public id"),
	EMPTY_FILE_EXCEPTION("USER_SERVICE_2005","Empty file exception"),
	EMAIL_MISSING_EXCEPTION("USER_SERVICE_2006","Email must not be null or empty"),
	EMAIL_VERIFICATION_FAILED("USER_SERVICE_2007","Provided email not associated with our db"),;
	
	
	
	private final String code;
	private final String message;
	

}
