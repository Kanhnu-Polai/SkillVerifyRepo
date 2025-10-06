package com.skillverify.userservice.exception;

import com.skillverify.userservice.constant.ErrorCodeEnum;

public class EmailVerificationFailed extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	private ErrorCodeEnum errorCodeEnum;
	
	public EmailVerificationFailed(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
	}

}
