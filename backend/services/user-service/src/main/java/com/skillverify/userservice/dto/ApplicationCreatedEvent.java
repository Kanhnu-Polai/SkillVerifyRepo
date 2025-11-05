package com.skillverify.userservice.dto;

import java.time.LocalDateTime;
import java.util.UUID;



import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationCreatedEvent {
	private String applicationId;
    private UUID jobId;
    private String jobTitle;
    private String applicantEmail;
    private String resumeUrl;
    private LocalDateTime appliedAt;
    private String status;
}
