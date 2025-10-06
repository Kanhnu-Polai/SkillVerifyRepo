package com.skillverify.userservice.exception;

import com.skillverify.userservice.constant.ErrorCodeEnum;

public class EmailMissingException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private ErrorCodeEnum errorCodeEnum;
	public EmailMissingException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
	}
	

}
