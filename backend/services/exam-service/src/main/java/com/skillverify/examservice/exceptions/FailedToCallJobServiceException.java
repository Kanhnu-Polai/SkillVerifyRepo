package com.skillverify.examservice.exceptions;

import com.skillverify.examservice.enums.ErrorCodeEnum;

import lombok.Getter;

@Getter
public class FailedToCallJobServiceException  extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	
	private final ErrorCodeEnum errorCodeEnum;
	
	
	public FailedToCallJobServiceException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
		
	}
	
	
	

}
