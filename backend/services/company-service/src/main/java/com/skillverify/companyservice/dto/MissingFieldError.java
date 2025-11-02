package com.skillverify.companyservice.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MissingFieldError {
	
	private String errorCode;
	private String errorMessage;
	private List<MissingFieldDto> missingFields;
	

}
