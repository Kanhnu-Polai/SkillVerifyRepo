package com.skillverify.applicationservice.dto;

import java.util.UUID;

import com.skillverify.applicationservice.constant.JobStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobManagerAckDto {
	
	private UUID jobId;
	private String applicationId;
	private String applicantEmail;
	private JobStatus status;
	private String resumeUrl;
	

}
