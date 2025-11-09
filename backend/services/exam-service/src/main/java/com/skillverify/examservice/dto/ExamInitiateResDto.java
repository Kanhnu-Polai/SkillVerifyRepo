package com.skillverify.examservice.dto;

import java.util.UUID;

import com.skillverify.examservice.constant.ExamStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExamInitiateResDto {
	
	private UUID applicationId;
	
	private Long userId;
	private ExamStatus examStatus;
	private UUID sessionId;
	private String duration;
	private UUID examId;
	private String candidateImageUrl;
	private String mobileUploadUrl;
	private String desktopUploadUrl;
	private String screenshotsUploadUrl;

}
