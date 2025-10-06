package com.skillverify.userservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillverify.userservice.entity.Resume;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, UUID> {
	
	
	void deleteByResumePublicId(String resumePublicId);

}
