package com.skillverify.profileinfoservice.service;

import java.time.LocalDateTime;

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
		// Fetch the profile info for the given userId
		ProfileInfo profileInfo = profileInfoRepository.findByUserId(userId);
		
		
		ResponseEntity<String> data =   	httpServiceEngine.callToUserServiceToUpdateProfileView(userId);
		log.info("Response from User Service: {}", data.getBody());
		
		if (profileInfo == null) {
	        throw new RuntimeException("Profile not found for userId: " + userId);
	    }

		// Create a new ProfileView entity from the DTO
		ProfileView view = ProfileView.builder()
	            .viewerName(profileViewDto.getViewerName())
	            .viewerUserId(profileViewDto.getViewerUserId())
	            .viewerPhotoUrl(profileViewDto.getViewerPhotoUrl())
	            .viewedAt(LocalDateTime.now())
	            .profileInfo(profileInfo)
	            .build();
		
		// Add the new view to the profile's list of views
		profileInfo.getProfileViews().add(view);
	
		return profileInfoRepository.save(profileInfo);
	}
	
	
	

}
