package com.skillverify.profileinfoservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.profileinfoservice.contants.ErrorCodeEnum;
import com.skillverify.profileinfoservice.dto.ProfileViewDto;
import com.skillverify.profileinfoservice.entity.ProfileInfo;
import com.skillverify.profileinfoservice.exception.UserIdNotProvidedException;
import com.skillverify.profileinfoservice.service.ProfileInfoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/profile-info")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") 
public class ProfileInfoController {
	
	
	
	private final ProfileInfoService profileInfoService;

@GetMapping("/get-post-info")
 public String updateProfileView(@RequestParam Long userId) {
	 log.info("Inside postInfo of ProfileInfoController");
	 return "Profile Info Service is up and running";
	 
 }

@PostMapping("/add-profile")
public ResponseEntity<ProfileInfo> addProfile(@RequestParam Long userId) {
	 log.info("Inside addProfile of ProfileInfoController");
	 
	 if(userId == null) {
		 throw new UserIdNotProvidedException(ErrorCodeEnum.USER_ID_NOT_PROVIDED);
	 }
	ProfileInfo profileInfo = profileInfoService.addProfile(userId);
	 return ResponseEntity.ok(profileInfo); 
	 
}


@PostMapping("/add-profile-view")
public ResponseEntity<ProfileInfo> addProfileView(@RequestParam Long userId,@RequestBody ProfileViewDto profileViewDto) {
	log.info("Inside addProfileView of ProfileInfoController");
	 
	 if(userId == null) {
		 throw new UserIdNotProvidedException(ErrorCodeEnum.USER_ID_NOT_PROVIDED);
	 }
	 
	ProfileInfo profileInfo = profileInfoService.addProfileView(userId,profileViewDto);
	 return ResponseEntity.ok(profileInfo);
	
}
	
	

}
