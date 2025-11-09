package com.skillverify.examservice.dto;

import java.util.UUID;

import com.skillverify.examservice.constant.SessionStatusEnum;

import lombok.Data;

@Data
public class SessionResponseDTO {

	 private UUID sessionId;
	    private SessionStatusEnum status;
	    private String mobileUploadUrl;
	    private String desktopUploadUrl;
	    private String screenshotsUploadUrl;
}
