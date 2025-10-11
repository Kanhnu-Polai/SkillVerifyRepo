package com.skillverify.userservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateEmailPhoneDto {
	
	private Long userId;
	private String newEmail;
	private String password;
	private String newPhoneNumber;

}
