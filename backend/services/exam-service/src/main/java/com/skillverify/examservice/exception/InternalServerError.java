package com.skillverify.examservice.exception;

import com.skillverify.examservice.constant.ErrorCodeEnum;

public class InternalServerError extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	private ErrorCodeEnum errorCodeEnum;
	public InternalServerError(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
		
	}

}
