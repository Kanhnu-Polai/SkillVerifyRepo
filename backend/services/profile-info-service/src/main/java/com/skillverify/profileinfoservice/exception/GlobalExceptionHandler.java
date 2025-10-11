package com.skillverify.profileinfoservice.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.skillverify.profileinfoservice.contants.ErrorCodeEnum;
import com.skillverify.profileinfoservice.dto.ErrorResponseDto;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	
	@ExceptionHandler(UserIdNotProvidedException.class)
	public ResponseEntity<ErrorResponseDto> handleUserIdNotProvidedException(UserIdNotProvidedException ex) {
		
		ErrorResponseDto errorResponse = ErrorResponseDto.builder()
				.errorCode(ErrorCodeEnum.USER_ID_NOT_PROVIDED.getCode())
				.errorMessage(ErrorCodeEnum.USER_ID_NOT_PROVIDED.getMessage())
				.build();
		return ResponseEntity.badRequest().body(errorResponse);

     }
}
