package com.skillverify.postservice.exception;

import com.skillverify.postservice.contant.ErrorCodeEnum;

public class PostNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	ErrorCodeEnum errorCode;
	public PostNotFoundException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCode = errorCodeEnum;
	}

}
