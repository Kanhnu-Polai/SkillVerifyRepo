package com.skillverify.sessionservice.uploader;

import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.skillverify.sessionservice.dto.CloudinaryUrlResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CloudinaryFolderService {
	
	private final Cloudinary cloudinary;
	
	
	
	public CloudinaryUrlResponse createSessionFolders(String sessionId) {
	    log.info("Creating folders for session: {}", sessionId);

	    try {
	        // Create a folder for the session in Cloudinary
	        cloudinary.api().createFolder("sessions/" + sessionId, ObjectUtils.emptyMap());

	        // Now you can build the URLs for frontend upload
	        String baseFolder = "sessions/" + sessionId;

	        CloudinaryUrlResponse urls = CloudinaryUrlResponse.builder()
	                .mobileUploadUrl("https://api.cloudinary.com/v1_1/dup5b38zp/image/upload?upload_preset=unsigned_exam_upload&folder=" + baseFolder + "/mobile")
	                .desktopUploadUrl("https://api.cloudinary.com/v1_1/dup5b38zp/image/upload?upload_preset=unsigned_exam_upload&folder=" + baseFolder + "/desktop")
	                .screenshotsUploadUrl("https://api.cloudinary.com/v1_1/dup5b38zp/image/upload?upload_preset=unsigned_exam_upload&folder=" + baseFolder + "/screenshots")
	                .build();

	        log.info("✅ Created folder and upload URLs for session {}: {}", sessionId, urls);
	        return urls;

	    } catch (Exception e) {
	        log.error("❌ Error creating Cloudinary folder for session {}", sessionId, e);
	        throw new RuntimeException("Failed to create Cloudinary folder", e);
	    }
	}

	

}
