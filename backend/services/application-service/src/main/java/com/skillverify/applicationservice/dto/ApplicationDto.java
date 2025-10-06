package com.skillverify.applicationservice.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.skillverify.applicationservice.constant.JobStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationDto {
	private UUID applicationId;
	private UUID jobId;
	private JobStatus status;
	private LocalDateTime appliedAt;

}
