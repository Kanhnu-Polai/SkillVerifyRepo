package com.skillverify.likeservice.exceptions;

import com.skillverify.likeservice.contants.ErrorCodeEnum;

public class UserIdNotProvidedException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	ErrorCodeEnum errorCode;
	public UserIdNotProvidedException(ErrorCodeEnum errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
						
						
	}

}
