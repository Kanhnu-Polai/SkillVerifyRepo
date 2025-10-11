package com.skillverify.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.skillverify.userservice.constant.ErrorCodeEnum;
import com.skillverify.userservice.dto.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	
	
	@ExceptionHandler(InvalidPublicIdException.class)
	public ResponseEntity<ErrorResponse> handleInvalidPublicIdException(InvalidPublicIdException ex) {
		ErrorResponse response = new ErrorResponse(
				ErrorCodeEnum.INVALID_PUBLIC_ID.getCode(),
				ErrorCodeEnum.INVALID_PUBLIC_ID.getMessage());
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
	
	@ExceptionHandler(EmptyFileException.class)
	public ResponseEntity<ErrorResponse> handleEmptyFileException(EmptyFileException ex) {
		ErrorResponse response = new ErrorResponse(
				ErrorCodeEnum.EMPTY_FILE_EXCEPTION.getCode(),
				ErrorCodeEnum.EMPTY_FILE_EXCEPTION.getMessage());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}
	
	
	
	@ExceptionHandler(EmailMissingException.class)
	public ResponseEntity<ErrorResponse> handleEmailMissingException(EmailMissingException ex) {
		ErrorResponse response = new ErrorResponse(
				ErrorCodeEnum.EMAIL_MISSING_EXCEPTION.getCode(),
				ErrorCodeEnum.EMAIL_MISSING_EXCEPTION.getMessage());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}
	
	
	@ExceptionHandler(EmailVerificationFailed.class)
	public ResponseEntity<ErrorResponse> handleEmailVeificaionFailed(EmailVerificationFailed ex) {
		ErrorResponse response = new ErrorResponse(
				ErrorCodeEnum.EMAIL_VERIFICATION_FAILED.getCode(),
				ErrorCodeEnum.EMAIL_VERIFICATION_FAILED.getMessage());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}
	
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
		ErrorResponse response = new ErrorResponse(
				ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION.getCode(),
				ErrorCodeEnum.USER_NOT_FOUND_EXCEPTION.getMessage());
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}
	
	@ExceptionHandler(UserIdNotProvidedException.class)
	public ResponseEntity<ErrorResponse> handleUserIdNotProvidedException(UserIdNotProvidedException ex) {
		ErrorResponse response = new ErrorResponse(
				ErrorCodeEnum.USER_ID_NOT_PROVIDED_EXCEPTION.getCode(),
				ErrorCodeEnum.USER_ID_NOT_PROVIDED_EXCEPTION.getMessage());
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}
	
	
	


}
