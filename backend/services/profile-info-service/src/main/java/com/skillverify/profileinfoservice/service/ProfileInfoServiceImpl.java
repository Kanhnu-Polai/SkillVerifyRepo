package com.skillverify.profileinfoservice.service;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillverify.profileinfoservice.dto.ProfileViewDto;
import com.skillverify.profileinfoservice.entity.ProfileInfo;
import com.skillverify.profileinfoservice.entity.ProfileView;
import com.skillverify.profileinfoservice.http.HttpServiceEngine;
import com.skillverify.profileinfoservice.repository.ProfileInfoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProfileInfoServiceImpl implements ProfileInfoService {
	
	private final ProfileInfoRepository profileInfoRepository;
	
	private final HttpServiceEngine httpServiceEngine;

	@Override
	public void updateProfileView(Long userId) {
		log.info("Inside updateProfileView of ProfileInfoServiceImpl");
		
		
	}

	@Override
	public ProfileInfo addProfile(Long userId) {
		log.info("Inside addProfile of ProfileInfoServiceImpl");
		// Check if profile already exists for the user
		ProfileInfo existingProfile = profileInfoRepository.findByUserId(userId);
		if (existingProfile != null) {
			log.info("Profile already exists for userId: {}", userId);
			return existingProfile; // Return existing profile if found
		}
		ProfileInfo profileInfo = ProfileInfo.builder()
				.userId(userId)
				.build();
		profileInfoRepository.save(profileInfo);
		
		return profileInfo;
		
		
		
		
		
	}

	
	@Override
	public ProfileInfo addProfileView(Long userId, ProfileViewDto profileViewDto) {
	    log.info("Inside addProfileView of ProfileInfoServiceImpl");

	    // 1️⃣ Try fetching profile
	    ProfileInfo profileInfo = profileInfoRepository.findByUserId(userId);

	    // 2️⃣ Create profile automatically if not exists
	    if (profileInfo == null) {
	        log.warn("Profile not found for userId: {}. Creating a fresh profile...", userId);

	        profileInfo = ProfileInfo.builder()
	                .userId(userId)
	                .profileViews(new ArrayList<>())  // very important
	                .build();

	        profileInfo = profileInfoRepository.save(profileInfo);
	    }

	    // 3️⃣ Call User-Service to update global profile view count
	    ResponseEntity<String> data =
	            httpServiceEngine.callToUserServiceToUpdateProfileView(userId);

	    log.info("Response from User Service: {}", data.getBody());

	    // 4️⃣ Add the view entry
	    ProfileView view = ProfileView.builder()
	            .viewerName(profileViewDto.getViewerName())
	            .viewerUserId(profileViewDto.getViewerUserId())
	            .viewerPhotoUrl(profileViewDto.getViewerPhotoUrl())
	            .viewedAt(LocalDateTime.now())
	            .profileInfo(profileInfo)
	            .build();

	    profileInfo.getProfileViews().add(view);

	    // 5️⃣ Save and return
	    return profileInfoRepository.save(profileInfo);
	}
	
	

}
