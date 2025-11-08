package com.skillverify.sessionservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CloudinaryUrlResponse {
	private String mobileUploadUrl;
	private String desktopUploadUrl;
	private String screenshotsUploadUrl;


}
