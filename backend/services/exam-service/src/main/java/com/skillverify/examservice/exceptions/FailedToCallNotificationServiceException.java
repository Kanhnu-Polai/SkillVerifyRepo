package com.skillverify.examservice.exceptions;

import com.skillverify.examservice.enums.ErrorCodeEnum;

public class FailedToCallNotificationServiceException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private final ErrorCodeEnum errorCodeEnum;
	
	public FailedToCallNotificationServiceException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
	
	}

}
