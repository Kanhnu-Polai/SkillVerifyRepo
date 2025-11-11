package com.skillverify.examservice.exception;

import com.skillverify.examservice.constant.ErrorCodeEnum;

public class ExamNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private ErrorCodeEnum errorCodeEnum;
	
	public ExamNotFoundException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		
		this.errorCodeEnum = errorCodeEnum;
		
	}
	

}
