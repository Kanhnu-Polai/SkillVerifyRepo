package com.skillverify.examservice.exception;

import com.skillverify.examservice.constant.ErrorCodeEnum;

import lombok.Data;


@Data
public class ApplicationNotFoundException extends RuntimeException {
	
	
	private static final long serialVersionUID = 1L;
	private ErrorCodeEnum errorCodeEnum;
	public ApplicationNotFoundException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		
		this.errorCodeEnum = errorCodeEnum;
		
	}

}
