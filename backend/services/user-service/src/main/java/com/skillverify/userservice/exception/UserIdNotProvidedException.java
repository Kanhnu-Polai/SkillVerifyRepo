package com.skillverify.userservice.exception;

import com.skillverify.userservice.constant.ErrorCodeEnum;

public class UserIdNotProvidedException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	ErrorCodeEnum errorCodeEnum;
	public UserIdNotProvidedException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
	}

}
