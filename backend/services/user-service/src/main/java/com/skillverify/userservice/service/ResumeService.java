package com.skillverify.userservice.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skillverify.userservice.repository.ResumeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {
	private final ResumeRepository repository;
	
	
	@Transactional
	public void deleteResumeByPublicId(String resumePublicId) {
		log.info("ResumeService || deleteResumeByPublicId() called with resumePublicId: {}", resumePublicId);
		repository.deleteByResumePublicId(resumePublicId);
		log.info("ResumeService || Resume with public ID {} deleted successfully", resumePublicId);
	}
	
	
	
	

}
