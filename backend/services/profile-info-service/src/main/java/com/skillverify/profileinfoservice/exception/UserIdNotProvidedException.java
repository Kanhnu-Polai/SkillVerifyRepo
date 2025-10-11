package com.skillverify.profileinfoservice.exception;

import com.skillverify.profileinfoservice.contants.ErrorCodeEnum;

public class UserIdNotProvidedException extends RuntimeException {

	ErrorCodeEnum errorCode;
	private static final long serialVersionUID = 1L;
	
	public UserIdNotProvidedException( ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCode = errorCodeEnum;

}}
