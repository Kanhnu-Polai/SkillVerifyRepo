package com.skillverify.userservice.service;

import com.skillverify.userservice.dto.SocialLinksDto;
import com.skillverify.userservice.dto.UserDataDto;
import com.skillverify.userservice.dto.UserSkillDto;

public interface UserDataService {
	UserDataDto addUserData(UserDataDto data);
	UserDataDto getUserById(Long id);
	UserDataDto getUserByEmail(String email);
	UserDataDto updateUserData(String email,UserDataDto updateData);
	void deleteUserData(String email,String password); // also request to auth - service to delete the user
	SocialLinksDto updateUserSocialLinks(SocialLinksDto socialLinksDto);
	UserSkillDto addSkillsToUser(UserSkillDto userSkillDto );

}
