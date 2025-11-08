package com.skillverify.sessionservice.service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillverify.sessionservice.contant.SessionStatusEnum;
import com.skillverify.sessionservice.dto.CloudinaryUrlResponse;
import com.skillverify.sessionservice.dto.InitiateDto;
import com.skillverify.sessionservice.dto.SessionInitiateRespons;
import com.skillverify.sessionservice.entity.ExamSession;
import com.skillverify.sessionservice.repository.SessionRepository;
import com.skillverify.sessionservice.uploader.CloudinaryFolderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService{
	
	
	
	private final SessionRepository sessionRepository;
	private final CloudinaryFolderService cloudFolderService;

	@Override
	public SessionInitiateRespons initiateSession(InitiateDto initiateDto) {
		log.info("✅ Initiating Exam Session for Exam ID: {}", initiateDto.getExamId());
		
		// TODO: Implement the logic to create and save an ExamSession based on InitiateDto
		// 1. Check the session for examId and candidateId to avoid duplicates
		// 2. Map InitiateDto to ExamSession entity
		// 3. Save the ExamSession entity to the database
		log.info("🔍 Checking for existing session for Exam ID: {} and Candidate ID: {}", initiateDto.getExamId(), initiateDto.getCandidateId());
		Optional<ExamSession> existingSession = sessionRepository.findByExamIdAndCandidateId(
				initiateDto.getExamId(), initiateDto.getCandidateId());
		
		if (existingSession.isPresent()) {
			log.info("⚠️ Existing session found for Exam ID: {} and Candidate ID: {}", initiateDto.getExamId(), initiateDto.getCandidateId());
			SessionInitiateRespons response = SessionInitiateRespons.builder()
					.sessionId(existingSession.get().getSessionId())
					.status(existingSession.get().getStatus())
					.build();
			return response;
		}
		log.info("✅ No existing session found. Creating new session.");
		
		// create folders in cloudinary
		CloudinaryUrlResponse urls= cloudFolderService.createSessionFolders(initiateDto.getExamId() );
		log.info("✅ Created folders in Cloudinary for Exam ID: {}. Upload URLs: {}", initiateDto.getExamId(), urls);
		
		// map and save
		
		ExamSession newSession = ExamSession.builder()
				.candidateId(initiateDto.getCandidateId())
				.applicationId(initiateDto.getApplicationId())
				.examId(initiateDto.getExamId())
				.status(SessionStatusEnum.INITIATED)
				.mobileProctoringDataUrl(urls.getMobileUploadUrl())
				.desktopCameraProctoringDataUrl(urls.getDesktopUploadUrl())
				.screenRecordingProctoringDataUrl(urls.getScreenshotsUploadUrl())
				.sessionCreationTime(Instant.now())
				.sessionDurationMinutes(initiateDto.getSessionDurationMinutes())
				.build();
		ExamSession savedSession = sessionRepository.save(newSession);
		
		// map 
		SessionInitiateRespons sessionResponse = SessionInitiateRespons.builder()
				.sessionId(savedSession.getSessionId())
				.status(savedSession.getStatus())
				.mobileUploadUrl(savedSession.getMobileProctoringDataUrl())
				.desktopUploadUrl(savedSession.getDesktopCameraProctoringDataUrl())
				.screenshotsUploadUrl(savedSession.getScreenRecordingProctoringDataUrl())
				.build();
		log.info("✅ Exam Session initiated successfully with Session ID: {}", savedSession.getSessionId());
				
		return sessionResponse; 
	}

}
