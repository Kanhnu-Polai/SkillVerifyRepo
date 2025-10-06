package com.skillverify.postservice.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.skillverify.postservice.contant.ErrorCodeEnum;
import com.skillverify.postservice.dto.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, ErrorResponse>> handleValidationException(MethodArgumentNotValidException ex) {
	
		Map<String, ErrorResponse> errorResponse = new HashMap<>();
		
		ex.getBindingResult()
		  .getFieldErrors()
		  .forEach(error->{
			  String fieldName=error.getField();
			    String defaultMessage = error.getDefaultMessage();;
			  
			  ErrorCodeEnum errorCodeEnum;
			  
			  switch (fieldName) {
              case "title":
                  errorCodeEnum = ErrorCodeEnum.POST_VALIDATION_TITLE_BLANK;
                  break;
              case "category":
            	  errorCodeEnum = ErrorCodeEnum.POST_VALIDATION_CATEGORY_BLANK;
                  break;
              case "status":
            	  errorCodeEnum = ErrorCodeEnum.POST_VALIDATION_STATUS_BLANK;
                  break;
              case "userId":
            	  errorCodeEnum = ErrorCodeEnum.POST_VALIDATION_USERID_BLANK;
                  break;
              default:
            	  errorCodeEnum = ErrorCodeEnum.POST_VALIDATION_TITLE_BLANK; // fallback
          }
			  errorResponse.put(fieldName, ErrorResponse.builder()
	                  .errorCode(errorCodeEnum.getCode())
	                  .errorMessage(defaultMessage != null ? defaultMessage : errorCodeEnum.getMessage())
	                  .build());
		  }
				 
				  );
		
		
		return ResponseEntity.badRequest().body(errorResponse);
	}
	
	
	@ExceptionHandler(ImageFileUploadException.class)
	public ResponseEntity<ErrorResponse> handleImageFileUploadExeption(ImageFileUploadException ex) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.errorCode(ErrorCodeEnum.IMAGE_FILE_UPLOAD_ERROR.getCode())
				.errorMessage(ErrorCodeEnum.IMAGE_FILE_UPLOAD_ERROR.getMessage())
				.build();
		
		return ResponseEntity.status(500).body(errorResponse);
	}
	
	@ExceptionHandler(PostNotFoundException.class)
	public ResponseEntity<ErrorResponse> handlePostNotFoundException(PostNotFoundException ex) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.errorCode(ErrorCodeEnum.POST_NOT_FOUND.getCode())
				.errorMessage(ErrorCodeEnum.POST_NOT_FOUND.getMessage())
				.build();
		
		return ResponseEntity.status(404).body(errorResponse);
	}

}
