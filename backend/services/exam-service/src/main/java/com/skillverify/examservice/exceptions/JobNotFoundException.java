package com.skillverify.examservice.exceptions;

import com.skillverify.examservice.enums.ErrorCodeEnum;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class JobNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private final ErrorCodeEnum errorCodeEnum;
	
	public JobNotFoundException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
	}

}
