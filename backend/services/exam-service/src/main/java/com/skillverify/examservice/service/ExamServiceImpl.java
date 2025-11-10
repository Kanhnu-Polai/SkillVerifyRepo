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
        log.info("🟢 [INITIATE] Exam initiation request started | userId={}, email={}, jobId={}",
                examInitiateReqDto.getUserId(),
                examInitiateReqDto.getUserEmail(),
                examInitiateReqDto.getJobId());

        // Step 1️⃣: Get Application ID
        log.info("📡 [STEP 1] Fetching Application ID from Application Service...");
        ResponseEntity<ApplicationServiceResponse> response =
                applicationServiceEnginee.getApplicationId(examInitiateReqDto.getUserEmail(),
                        examInitiateReqDto.getJobId());

        UUID applicationId = response.getBody().getApplicationId();
        log.info("✅ [STEP 1] Application ID received: {}", applicationId);

        // Step 2️⃣: Check for existing exam
        log.info("🔍 [STEP 2] Checking for existing exam for userId={} and applicationId={}",
                examInitiateReqDto.getUserId(), applicationId);
        Optional<Exam> existingExam = examRepository.findByUserIdAndApplicationId(
                examInitiateReqDto.getUserId(), applicationId);

        // Step 3️⃣: Upload candidate image
        Map<String, String> uploadResult = null;
        try {
            log.info("📤 [STEP 3] Uploading candidate photo to Cloudinary for userId={}",
                    examInitiateReqDto.getUserId());
            uploadResult = cloudinaryService.uploadFile(file, "exam-uploads");
            log.info("✅ [STEP 3] File uploaded successfully. URL={}", uploadResult.get("url"));
        } catch (IOException e) {
            log.error("❌ [STEP 3] Failed to upload file to Cloudinary for userId={}", 
                    examInitiateReqDto.getUserId(), e);
        }

        // Step 4️⃣: If exam already exists
        if (existingExam.isPresent()) {
            Exam existing = existingExam.get();
            log.warn("⚠️ [STEP 4] Existing exam found for userId={} | examId={}",
                    examInitiateReqDto.getUserId(), existing.getExamId());

            SessionResponseDTO sessionData = getSessionInfo(existing, examInitiateReqDto, applicationId);
            log.info("🆕 [STEP 4.1] New session created for existing exam | sessionId={}", sessionData.getSessionId());

            return toExamInitiateResDto(
                    existing,
                    sessionData.getSessionId(),
                    sessionData.getMobileUploadUrl(),
                    sessionData.getDesktopUploadUrl(),
                    sessionData.getScreenshotsUploadUrl(),
                    uploadResult != null ? uploadResult.get("url") : null
            );
        }

        // Step 5️⃣: Create new exam record
        log.info("🧾 [STEP 5] No existing exam found. Creating a new record for userId={} and applicationId={}",
                examInitiateReqDto.getUserId(), applicationId);

        Exam exam = Exam.builder()
                .applicationId(applicationId)
                .userId(examInitiateReqDto.getUserId())
                .candidateImageUrl(uploadResult != null ? uploadResult.get("url") : null)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .examStatus(ExamStatus.INITIATED)
                .build();

        exam = examRepository.save(exam);
        log.info("✅ [STEP 5] Exam created successfully | examId={}", exam.getExamId());

        // Step 6️⃣: Create new session via Session Service
        SessionResponseDTO sessionData = getSessionInfo(exam, examInitiateReqDto, applicationId);
        log.info("✅ [STEP 6] Session created successfully | sessionId={}", sessionData.getSessionId());

        // Step 7️⃣: Build final response
        ExamInitiateResDto examInitiateResDto = toExamInitiateResDto(
                exam,
                sessionData.getSessionId(),
                sessionData.getMobileUploadUrl(),
                sessionData.getDesktopUploadUrl(),
                sessionData.getScreenshotsUploadUrl(),
                uploadResult != null ? uploadResult.get("url") : null
        );

        log.info("🚀 [STEP 7] Exam initiation completed successfully | examId={} | sessionId={}",
                exam.getExamId(), sessionData.getSessionId());

        return examInitiateResDto;
    }

    private SessionResponseDTO getSessionInfo(Exam exam, ExamInitiateReqDto examInitiateReqDto, UUID applicationId) {
        log.info("🌐 [SESSION] Creating new session for examId={} | userId={}",
                exam.getExamId(), examInitiateReqDto.getUserId());

        SessionRequest request = SessionRequest.builder()
                .candidateId(examInitiateReqDto.getUserId())
                .applicationId(applicationId)
                .examId(exam.getExamId().toString())
                .status(SessionStatusEnum.INITIATED)
                .sessionDurationMinutes(45)
                .build();

        ResponseEntity<SessionResponseDTO> sessionResponse = httpEnginee.getSessionInfo(request);
        SessionResponseDTO sessionData = sessionResponse.getBody();

        log.info("🧩 [SESSION] SessionService responded successfully | sessionId={}", sessionData.getSessionId());
        return sessionData;
    }

    private ExamInitiateResDto toExamInitiateResDto(
            Exam exam,
            UUID sessionId,
            String mobileUploadUrl,
            String desktopUploadUrl,
            String screenshotsUploadUrl,
            String candidateImageUrl) {

        log.debug("🧠 [BUILD] Constructing ExamInitiateResDto for examId={} | sessionId={}", exam.getExamId(), sessionId);

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