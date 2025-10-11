package com.skillverify.likeservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponseDto {
	
	private String errorMessage;
	private String errorCode;

}
