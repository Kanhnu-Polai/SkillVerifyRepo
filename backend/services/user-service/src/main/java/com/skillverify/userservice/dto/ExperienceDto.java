package com.skillverify.userservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceDto {
	
	private Long id;
	private String role;
	private String company;
	private String location;
	private String startDate;
	private String endDate;
	private String description;
	
	private boolean current;
	private String duration;
	
	
	
	@JsonProperty("isDelete")
	private boolean delete;

	

}
