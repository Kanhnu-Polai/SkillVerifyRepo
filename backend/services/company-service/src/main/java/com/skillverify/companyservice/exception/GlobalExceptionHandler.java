package com.skillverify.companyservice.exception;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.skillverify.companyservice.contants.ErrorCodeEnum;
import com.skillverify.companyservice.dto.MissingFieldDto;
import com.skillverify.companyservice.dto.MissingFieldError;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	
	 
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<MissingFieldError> handleValidationExceptions(MethodArgumentNotValidException ex) {
		
		List<MissingFieldDto> missingFieldsDtos = ex.getBindingResult().getFieldErrors().stream()
				.map(error -> MissingFieldDto.builder()
						.field(error.getField())
						.message(error.getDefaultMessage())
						.build())
				.toList();
		
		MissingFieldError missingFieldError = MissingFieldError.builder()
				.errorCode(ErrorCodeEnum.COMPANY_CREATION_INVALID_DATA.getCode())
				.errorMessage(ErrorCodeEnum.COMPANY_CREATION_INVALID_DATA.getMessage())
				.missingFields(missingFieldsDtos)
				.build();
		return ResponseEntity.badRequest().body(missingFieldError);
		
	}

}
