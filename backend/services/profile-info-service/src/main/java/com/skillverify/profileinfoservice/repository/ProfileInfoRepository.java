package com.skillverify.profileinfoservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillverify.profileinfoservice.entity.ProfileInfo;

public interface ProfileInfoRepository extends JpaRepository<ProfileInfo, UUID> {
		ProfileInfo findByUserId(Long userId);
	

}
