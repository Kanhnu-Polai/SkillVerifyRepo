package com.skillverify.examservice.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.skillverify.examservice.constant.ExamStatus;
import com.skillverify.examservice.constant.SessionStatusEnum;
import com.skillverify.examservice.dto.ApplicationServiceResponse;
import com.skillverify.examservice.dto.ExamInitiateReqDto;
import com.skillverify.examservice.dto.ExamInitiateResDto;
import com.skillverify.examservice.dto.SessionRequest;
import com.skillverify.examservice.dto.SessionResponseDTO;
import com.skillverify.examservice.entity.Exam;
import com.skillverify.examservice.http.ApplicationServiceEnginee;
import com.skillverify.examservice.http.SessionServiceEnginee;
import com.skillverify.examservice.repository.ExamRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

	private final ExamRepository examRepository;
	private final SessionServiceEnginee httpEnginee;
	private final CloudinaryService cloudinaryService;
	private final ApplicationServiceEnginee applicationServiceEnginee;

	@Override
	public ExamInitiateResDto initiateExam(ExamInitiateReqDto examInitiateReqDto, MultipartFile file) {
		log.info("✅ Exam initiation request received for userId: {}", examInitiateReqDto.getUserId());

		// Step 1: Get Application ID from Application Service
		ResponseEntity<ApplicationServiceResponse> response = applicationServiceEnginee.getApplicationId(
				examInitiateReqDto.getUserEmail(), examInitiateReqDto.getJobId());

		// Step 2: Check if exam already exists for this user and application
		Optional<Exam> existingExam = examRepository.findByUserIdAndApplicationId(
				examInitiateReqDto.getUserId(), response.getBody().getApplicationId());

		// Step 3: Upload candidate image to Cloudinary
		Map<String, String> uploadResult = null;
		try {
			log.info("📤 Uploading file to Cloudinary for userId: {}", examInitiateReqDto.getUserId());
			uploadResult = cloudinaryService.uploadFile(file, "exam-uploads");
			log.info("✅ File uploaded successfully. URL: {}", uploadResult.get("url"));
		} catch (IOException e) {
			log.error("❌ Failed to upload file to Cloudinary for userId: {}", examInitiateReqDto.getUserId(), e);
		}

		// Step 4: If existing exam found, return existing exam details
		if (existingExam.isPresent()) {
			log.info("⚠️ Existing exam found for userId: {} and applicationId: {}", 
					examInitiateReqDto.getUserId(), response.getBody().getApplicationId());

			Exam existing = existingExam.get();
			return ExamInitiateResDto.builder()
					.examId(existing.getExamId())
					.examStatus(existing.getExamStatus())
					.applicationId(response.getBody().getApplicationId())
					.userId(existing.getUserId())
					.duration(existing.getDuration())
					.sessionId(existing.getSessionId())
					.build();
		}

		// Step 5: Create new Exam record
		log.info("🆕 No existing exam found. Creating a new exam for userId: {} and applicationId: {}",
				examInitiateReqDto.getUserId(), response.getBody().getApplicationId());

		Exam exam = Exam.builder()
				.applicationId(response.getBody().getApplicationId())
				.userId(examInitiateReqDto.getUserId())
				.candidateImageUrl(uploadResult != null ? uploadResult.get("url") : null)
				.createdAt(LocalDateTime.now())
				.updatedAt(LocalDateTime.now())
				.examStatus(ExamStatus.INITIATED)
				.build();

		exam = examRepository.save(exam);
		log.info("✅ Exam initiated successfully with examId: {}", exam.getExamId());

		// Step 6: Create Session through Session Service
		SessionRequest request = SessionRequest.builder()
				.candidateId(examInitiateReqDto.getUserId())
				.applicationId(response.getBody().getApplicationId())
				.examId(exam.getExamId().toString())
				.status(SessionStatusEnum.INITIATED)
				.sessionDurationMinutes(45)
				.build();

		ResponseEntity<SessionResponseDTO> sessionResponse = httpEnginee.getSessionInfo(request);
		SessionResponseDTO sessionData =  sessionResponse.getBody();
		log.info("✅ Session created successfully with sessionId: {}", sessionData.getSessionId());

		// Step 7: Build final response
		ExamInitiateResDto examInitiateResDto = toExamInitiateResDto(
				exam,
				sessionData.getSessionId(),
				sessionData.getMobileUploadUrl(),
				sessionData.getDesktopUploadUrl(),
				sessionData.getScreenshotsUploadUrl(),
				uploadResult != null ? uploadResult.get("url") : null
		);

		log.info("🚀 Sending final exam initiation response for examId: {}", exam.getExamId());
		return examInitiateResDto;
	}

	private ExamInitiateResDto toExamInitiateResDto(
			Exam exam,
			UUID sessionId,
			String mobileUploadUrl,
			String desktopUploadUrl,
			String screenshotsUploadUrl,
			String candidateImageUrl) {

		return ExamInitiateResDto.builder()
				.examId(exam.getExamId())
				.examStatus(exam.getExamStatus())
				.applicationId(exam.getApplicationId())
				.userId(exam.getUserId())
				.duration(exam.getDuration())
				.sessionId(sessionId)
				.mobileUploadUrl(mobileUploadUrl)
				.desktopUploadUrl(desktopUploadUrl)
				.screenshotsUploadUrl(screenshotsUploadUrl)
				.candidateImageUrl(candidateImageUrl)
				.build();
	}
}