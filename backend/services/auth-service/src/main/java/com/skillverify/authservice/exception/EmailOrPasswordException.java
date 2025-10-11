package com.skillverify.authservice.exception;

import com.skillverify.authservice.errorcodeenum.ErrorCodeEnum;

public class EmailOrPasswordException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	ErrorCodeEnum errorCode;
	public EmailOrPasswordException(ErrorCodeEnum errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
	}

}
