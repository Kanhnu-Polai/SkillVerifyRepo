package com.skillverify.profileinfoservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponseDto {
	
	private String errorCode;
	private String errorMessage;
	

}
