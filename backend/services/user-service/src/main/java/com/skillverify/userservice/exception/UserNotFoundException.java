package com.skillverify.userservice.exception;

import com.skillverify.userservice.constant.ErrorCodeEnum;

public class UserNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	ErrorCodeEnum errorCode;

	public UserNotFoundException(ErrorCodeEnum errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}

}
