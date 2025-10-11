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
public class EducationDto {
	

	 private Long id;
	 private String degree;
	    private String fieldOfStudy;
	    private String institution;
	    private String startYear;
	    private String endYear;
	    private String description;
	    
	    @JsonProperty("isDelete")
	    private boolean delete;
		
}
