package com.skillverify.examservice.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.skillverify.examservice.constant.ErrorCodeEnum;
import com.skillverify.examservice.constant.ErrorResponseDto;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExecptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {

		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

		return ResponseEntity.badRequest().body(errors);
	}

	@ExceptionHandler(ApplicationNotFoundException.class)
	public ResponseEntity<ErrorResponseDto> handleApplicationIdNotFoundException(ApplicationNotFoundException ex) {
		log.warn("⚠️ Application not found: {}", ex.getMessage());

		ErrorResponseDto errorResponse = ErrorResponseDto.builder()
				.errorCode(ErrorCodeEnum.APPLICATION_NOT_FOUND.getCode())
				.errorMessage(ErrorCodeEnum.APPLICATION_NOT_FOUND.getMessage()).build();

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);

	}
	
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponseDto> handleInternalServerError(Exception ex){
		log.warn("⚠️ Internal Server Error: {}", ex.getMessage());
		ErrorResponseDto errorResponse = ErrorResponseDto.builder()
				.errorCode(ErrorCodeEnum.SERVER_ERROR.getCode())
				.errorMessage(ErrorCodeEnum.SERVER_ERROR.getMessage())
				.build();
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		
	}

}
