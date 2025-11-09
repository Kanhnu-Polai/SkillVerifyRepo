package com.skillverify.sessionservice.dto;

import java.util.UUID;

import com.skillverify.sessionservice.contant.SessionStatusEnum;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SessionInitiateRespons {
	
	private UUID sessionId;
	private SessionStatusEnum status;
	private String mobileUploadUrl;
	private String desktopUploadUrl;
	private String screenshotsUploadUrl;

}
