package com.skillverify.authservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthUpdateDto {

	private String newEmail;
	private String oldEmail;
	
	
}
