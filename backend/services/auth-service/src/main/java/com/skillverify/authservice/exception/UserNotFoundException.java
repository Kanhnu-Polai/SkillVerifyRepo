package com.skillverify.authservice.exception;

import com.skillverify.authservice.errorcodeenum.ErrorCodeEnum;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	ErrorCodeEnum errorCode;

	public UserNotFoundException(ErrorCodeEnum errorCode) {
		super(errorCode.getMessage());
		this.errorCode = errorCode;
		
	}

}
