package com.skillverify.userservice.service;

import com.skillverify.userservice.dto.EducationDto;
import com.skillverify.userservice.dto.ExperienceDto;
import com.skillverify.userservice.dto.SocialLinksDto;
import com.skillverify.userservice.dto.UpdateEmailPhoneDto;
import com.skillverify.userservice.dto.UserDataDto;
import com.skillverify.userservice.dto.UserSkillDto;

public interface UserDataService {
	UserDataDto addUserData(UserDataDto data);
	UserDataDto getUserById(Long id);
	UserDataDto getUserByEmail(String email);
	UserDataDto updateUserData(String email,UserDataDto updateData);
	void deleteUserData(String email,String password); 
	SocialLinksDto updateUserSocialLinks(SocialLinksDto socialLinksDto);
	UserSkillDto addSkillsToUser(UserSkillDto userSkillDto );
	UserDataDto updateUserEmailAndPhone(UpdateEmailPhoneDto updateEmailPhoneDto); 
	EducationDto updateUserEducation(EducationDto educationDto, Long userId);
	ExperienceDto updateUserExperience(ExperienceDto experienceDto, Long userId);
	boolean updateProfileView(Long userId);
	boolean updatePostCount(Long userId);
	

}
