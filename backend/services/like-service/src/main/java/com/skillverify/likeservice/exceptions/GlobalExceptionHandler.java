package com.skillverify.likeservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.skillverify.likeservice.contants.ErrorCodeEnum;
import com.skillverify.likeservice.dto.ErrorResponseDto;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	
	
	@ExceptionHandler(UserIdNotProvidedException.class)
	public ResponseEntity<ErrorResponseDto> handleUserNotProvidedException(UserIdNotProvidedException ex) {
		ErrorResponseDto errorResponse = ErrorResponseDto.builder()
				.errorMessage(ErrorCodeEnum.USER_NOT_PROVIDED_EXCEPTION.getMessage())
				.errorCode(ErrorCodeEnum.USER_NOT_PROVIDED_EXCEPTION.getCode())
				.build();
		
		return ResponseEntity.status(HttpStatus.OK).body(errorResponse);
	}

}
