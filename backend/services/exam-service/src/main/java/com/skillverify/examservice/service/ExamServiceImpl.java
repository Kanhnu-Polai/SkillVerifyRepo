package com.skillverify.examservice.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.skillverify.examservice.constant.ExamStatus;
import com.skillverify.examservice.dto.ExamInitiateReqDto;
import com.skillverify.examservice.dto.ExamInitiateResDto;
import com.skillverify.examservice.dto.SessionRequest;
import com.skillverify.examservice.dto.SessionResponseDTO;
import com.skillverify.examservice.entity.Exam;
import com.skillverify.examservice.http.HttpEnginee;
import com.skillverify.examservice.repository.ExamRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {
	
	private final ExamRepository examRepository;
	private final HttpEnginee httpEnginee;
	
	private final CloudinaryService cloudinaryService;
	

	@Override
	public ExamInitiateResDto initiateExam(ExamInitiateReqDto examInitiateReqDto,MultipartFile files) {
		log.info("✅ Exam initiation request received for userId:{}",examInitiateReqDto.getUserId());
		
		// check if userID and applicationId already available or not
		// if available, then return the existing exam details
		Optional<Exam> existingExam = examRepository.findByUserIdAndApplicationId(
				examInitiateReqDto.getUserId(), examInitiateReqDto.getApplicationId());
		
		
		// Save image in cloudinary 
		 Map<String, String> uploadResult = null;
		
		try {
			log.info("Uploading file to Cloudinary for exam initiation, userId:{}",examInitiateReqDto.getUserId());
			uploadResult =  cloudinaryService.uploadFile(files, "exam-uploads");
			log.info("✅ File uploaded to Cloudinary successfully for userId:{} , URL: {}",
					examInitiateReqDto.getUserId(),uploadResult.get("url"));
		} catch (IOException e) {
			log.error("❌ Failed to upload file to Cloudinary for userId:{}",examInitiateReqDto.getUserId());
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	   
		
		
		if(existingExam.isPresent()) {
			log.info("⚠️ Existing exam found for userId:{} and applicationId:{}",examInitiateReqDto.getUserId(),examInitiateReqDto.getApplicationId());
			ExamInitiateResDto response = ExamInitiateResDto.builder()
					.examId(existingExam.get().getExamId())
					.examStatus(existingExam.get().getExamStatus())
					.applicationId(existingExam.get().getApplicationId())
					.userId(existingExam.get().getUserId())
					.duration(existingExam.get().getDuration())
					.sessionId(existingExam.get().getSessionId())
					.build();
			return response;
		}
		
		log.info("✅ No existing exam found for userId:{} and applicationId:{}. Proceeding to create a new exam.",
				examInitiateReqDto.getUserId(),examInitiateReqDto.getApplicationId());
		
		Exam exam = Exam.builder()
				.examDetailId(examInitiateReqDto.getExamDetailId())
				.applicationId(examInitiateReqDto.getApplicationId())
				.userId(examInitiateReqDto.getUserId())
				.candidateImageUrl(uploadResult != null ? uploadResult.get("url") : null)
				.createdAt(LocalDateTime.now())
				.examStatus(ExamStatus.INITIATED)
				.updatedAt(LocalDateTime.now())
				.build();
		
		exam = examRepository.save(exam);
		log.info("✅ Exam initiated successfully for examId:{}",exam.getExamId());
		
		
		
		
		log.info("✅ Exam initiation response prepared for examId:{}",exam.getExamId());
				
				
		//TODO: implement the exam initiation logic
		//step-1 : validate the user by calling user-service
		//step-2 : validate the application by calling application-service
		
		
		
		//step-3 : get the session details by calling session-service
		
		SessionRequest request = SessionRequest.builder()
				.candidateId(String.valueOf(examInitiateReqDto.getUserId()))
				.applicationId(String.valueOf(examInitiateReqDto.getApplicationId()))
				.examId(String.valueOf(exam.getExamId()))
				.status(com.skillverify.examservice.constant.SessionStatusEnum.INITIATED)
				.sessionDurationMinutes(90L)
				.build();
		
		ResponseEntity<SessionResponseDTO> response = httpEnginee.getSessionInfo(request);
		log.info("✅ Received session details with session id:{}",response.getBody().getSessionId());
		ExamInitiateResDto examInitiateResDto = toExamInitiateResDto(exam, response.getBody().getSessionId(),
				response.getBody().getMobileUploadUrl(),response.getBody().getDesktopUploadUrl(),
				response.getBody().getScreenshotsUploadUrl(),uploadResult.get("url"));
		
		
		
		//step-4 : get the exam details from exam-details-service
		
		//step-5 : create exam entity and save it to exam table
		
		log.info("✅ Sending exam initiation response for examId:{}",exam.getExamId());
		return examInitiateResDto;
	}
	
	
	
	
	
	private ExamInitiateResDto toExamInitiateResDto(Exam exam ,String sessionId,String mobileUploadUrl,
			String desktopUploadUrl,String screenshotsUploadUrl,String candidateImageUrl) {
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
