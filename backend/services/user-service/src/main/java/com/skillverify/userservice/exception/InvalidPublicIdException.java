package com.skillverify.userservice.exception;

import com.skillverify.userservice.constant.ErrorCodeEnum;

public class InvalidPublicIdException extends RuntimeException {
	
	private ErrorCodeEnum errorCodeEnum;
	public InvalidPublicIdException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
	}

}
