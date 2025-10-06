package com.skillverify.applicationservice.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillverify.applicationservice.constant.JobStatus;
import com.skillverify.applicationservice.dto.ApplicationDto;
import com.skillverify.applicationservice.dto.FetchedJobDto;
import com.skillverify.applicationservice.dto.JobApplyDto;
import com.skillverify.applicationservice.dto.JobApplyResponseDto;
import com.skillverify.applicationservice.entity.JobApplication;
import com.skillverify.applicationservice.http.JobServiceEngine;
import com.skillverify.applicationservice.http.NotificationEngine;
import com.skillverify.applicationservice.repository.JobApplicationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

	private final JobApplicationRepository jobApplicationRepository;
	private final NotificationEngine notificationEngine;
	private final JobServiceEngine jobServiceEngine;

	@Override
	public JobApplyResponseDto applyForJob(JobApplyDto dto) {
		log.info("Processing job application for: {}", dto.getJobSeekerEmail());
		JobApplication existing = jobApplicationRepository.findByEmailAndJobId(dto.getJobSeekerEmail(), dto.getJobId());

		if (existing != null) {
			log.info("Duplicate application for {} / {}", dto.getJobSeekerEmail(), dto.getJobId());
			return JobApplyResponseDto.builder().jobTitle(existing.getJobTitle()).status(existing.getStatus())
					.appliedAt(existing.getAppliedAt()).build();
		}

		// 2) Create new
		JobApplication newApp = JobApplication.builder().jobId(dto.getJobId()).jobTitle(dto.getJobTitle()) // make sure
																											// it's
																											// present
				.email(dto.getJobSeekerEmail()).resumeUrl(dto.getResumeUrl()).status(JobStatus.CREATED)
				.appliedAt(LocalDateTime.now()).build();

		jobApplicationRepository.save(newApp);
		log.info("Created application {}", newApp.getId());

		// 3) Notify other services
//	    jobServiceEngine.updateCandidateCount(newApp.getJobId());   // renamed
//	    notificationEngine.makeCallToNotificationService(
//	            dto.getJobSeekerEmail(),
//	            "Job Application Confirmation",
//	            String.format("You applied for %s. Current status: %s",
//	                    newApp.getJobTitle(), newApp.getStatus())
//	    );

		// 4) Return DTO
		return JobApplyResponseDto.builder().jobTitle(newApp.getJobTitle()).status(newApp.getStatus())
				.appliedAt(newApp.getAppliedAt()).build();
	}

	@Override
	public ResponseEntity<List<FetchedJobDto>> getJobApplicationIdByEmail(String email) {
		log.info("Fetching job application ID for email: {}", email);
		List<UUID> jobIds = jobApplicationRepository.findJobIdsByEmail(email);
		log.info("Found {} jobIds: {}", jobIds.size(), jobIds);
		if (jobIds.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(List.of()); // Return empty list if no job IDs found
		}
		ResponseEntity<List<FetchedJobDto>> jobs = jobServiceEngine.fetchJobsById(jobIds);
		log.info("Feched Jobs: {}", jobs.getBody());
		List<FetchedJobDto> fetchedJobs = jobs.getBody();
		log.info("Fetched {} jobs for email: {}", fetchedJobs.size(), email);
		if (fetchedJobs == null || fetchedJobs.isEmpty()) {
			log.warn("No jobs found for email: {}", email);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
		}
		log.info("Fetched {} jobs for email: {}", fetchedJobs.size(), email);
		List<ApplicationDto> applications = getApplicationsByEmail(email);
		fetchedJobs = addStatusOnFetchJobDtoString(fetchedJobs, applications);
		fetchedJobs.forEach(job -> {
			log.info("Job ID: {}, Title: {}, Status: {}", job.getJobId(), job.getJobTitle(), job.getStatus());
		});

		return ResponseEntity.status(HttpStatus.OK).body(fetchedJobs); // <- plain list, no casts, no ResponseEntity
	}
	
	
	
	
	

	private List<ApplicationDto> getApplicationsByEmail(String email) {
	    log.info("Fetching applications Kanhu  for email: {}", email);

	    List<JobApplication> applications = jobApplicationRepository.findByEmail(email); 
	    if (applications.isEmpty()) {
	        log.info("No applications found for email: {}", email);
	        return List.of(); // Return an empty list if no applications found
	    }
	    List<ApplicationDto> applicationDtos = applications.stream()
	            .map(app -> ApplicationDto.builder()
	                    .applicationId(UUID.fromString(app.getApplicationId()))
	                    .jobId(app.getJobId())
	                    .status(app.getStatus())
	                    .appliedAt(app.getAppliedAt())
	                    .build())
	            .collect(Collectors.toList());
	  

	    log.info("Found {} applications for email: {}", applications.size(), email);

	 

	    return applicationDtos;
	}

	private List<FetchedJobDto> addStatusOnFetchJobDtoString(List<FetchedJobDto> fetchedJobs,
			List<ApplicationDto> applications) {
		log.info("Applications reveived {} ", applications);
		log.info("Fetched jobs received {} ", fetchedJobs);
		if (fetchedJobs == null || fetchedJobs.isEmpty()) {
			log.warn("No jobs found for the given criteria.");
			return Collections.emptyList();
		}

		Map<String, JobStatus> applicationStatusMap = applications.stream().collect(Collectors.toMap(
				app -> app.getJobId().toString(), ApplicationDto::getStatus, (existing, replacement) -> existing));

		// Handle duplicates by keeping the existing status
		fetchedJobs.forEach(job -> {
			JobStatus status = applicationStatusMap.get(job.getJobId().toString());
			if (status != null) {
				log.info("Setting status for job ID {}: {}", job.getJobId(), status);
				job.setStatus(status);
			} else {
				log.info("No status found for job ID {}. Setting to CREATED.", job.getJobId());
				job.setStatus(JobStatus.CREATED); // Default status if not found
			}
		});
		log.info("Jobs with statuses: {}", fetchedJobs);
		return fetchedJobs;
	}

}
