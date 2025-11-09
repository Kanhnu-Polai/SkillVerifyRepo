package com.skillverify.examservice.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class SessionResponseDTO {

	 private UUID sessionId;
	    private String status;
	    private String mobileUploadUrl;
	    private String desktopUploadUrl;
	    private String screenshotsUploadUrl;
}
