package com.skillverify.profileinfoservice.service;

import com.skillverify.profileinfoservice.dto.ProfileViewDto;
import com.skillverify.profileinfoservice.entity.ProfileInfo;

public interface ProfileInfoService {
	
	void updateProfileView(Long userId);
	ProfileInfo addProfile(Long userId);
	ProfileInfo addProfileView(Long userId,ProfileViewDto profileViewDto);

}
