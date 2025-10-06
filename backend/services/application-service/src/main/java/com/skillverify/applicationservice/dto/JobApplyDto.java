package com.skillverify.applicationservice.dto;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobApplyDto {
	
	
	private String jobSeekerEmail;
	private String jobTitle;
	private String resumeUrl;
	private UUID jobId;

}
