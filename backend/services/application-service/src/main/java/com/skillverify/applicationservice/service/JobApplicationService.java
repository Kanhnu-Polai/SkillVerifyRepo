package com.skillverify.applicationservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

import com.skillverify.applicationservice.dto.ApplicationIDFoundResponse;
import com.skillverify.applicationservice.dto.JobApplyDto;
import com.skillverify.applicationservice.dto.JobApplyResponseDto;

public interface JobApplicationService {
    JobApplyResponseDto applyForJob(JobApplyDto jobApplyDto);
ResponseEntity<?> getJobApplicationIdByEmail(String email);
ResponseEntity<ApplicationIDFoundResponse> getApplicationByEmailAndJobId(String email,UUID jobId);
  
}