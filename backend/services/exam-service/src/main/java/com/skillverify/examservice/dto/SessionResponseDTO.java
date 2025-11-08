package com.skillverify.examservice.dto;

import lombok.Data;

@Data
public class SessionResponseDTO {

	 private String sessionId;
	    private String status;
	    private String mobileUploadUrl;
	    private String desktopUploadUrl;
	    private String screenshotsUploadUrl;
}
