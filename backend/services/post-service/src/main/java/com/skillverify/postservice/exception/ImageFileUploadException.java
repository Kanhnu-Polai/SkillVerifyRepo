package com.skillverify.postservice.exception;

import com.skillverify.postservice.contant.ErrorCodeEnum;




public class ImageFileUploadException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	private  ErrorCodeEnum errorCodeEnum;
	
	public ImageFileUploadException(ErrorCodeEnum errorCodeEnum) {
		super(errorCodeEnum.getMessage());
		this.errorCodeEnum = errorCodeEnum;
	}
}
