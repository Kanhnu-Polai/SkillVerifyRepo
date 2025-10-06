package com.skillverify.userservice.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSkillDto {
	
	private String email;
	private List<String> skills;

}
