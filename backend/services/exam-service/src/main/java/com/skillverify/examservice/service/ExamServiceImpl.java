package com.skillverify.examservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillverify.examservice.constant.ExamStatus;
import com.skillverify.examservice.dto.ExamInitiateReqDto;
import com.skillverify.examservice.dto.ExamInitiateResDto;
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
	

	@Override
	public ExamInitiateResDto initiateExam(ExamInitiateReqDto examInitiateReqDto) {
		log.info("✅ Exam initiation request received for userId:{}",examInitiateReqDto.getUserId());
		
		// check if userID and applicationId already available or not
		// if available, then return the existing exam details
		Optional<Exam> existingExam = examRepository.findByUserIdAndApplicationId(
				examInitiateReqDto.getUserId(), examInitiateReqDto.getApplicationId());
		
		
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
				.createdAt(LocalDateTime.now())
				.examStatus(ExamStatus.INITIATED)
				.updatedAt(LocalDateTime.now())
				.build();
		
		exam = examRepository.save(exam);
		log.info("✅ Exam initiated successfully for examId:{}",exam.getExamId());
		
		
		ExamInitiateResDto examInitiateResDto = toExamInitiateResDto(exam);
		
		log.info("✅ Exam initiation response prepared for examId:{}",exam.getExamId());
				
				
		//TODO: implement the exam initiation logic
		//step-1 : validate the user by calling user-service
		//step-2 : validate the application by calling application-service
		
		
		
		//step-3 : get the session details by calling session-service
		
		String sessionId = httpEnginee.getSessionId();
		examInitiateResDto.setSessionId(sessionId);
		//step-4 : get the exam details from exam-details-service
		//step-5 : create exam entity and save it to exam table
		
		log.info("✅ Sending exam initiation response for examId:{}",exam.getExamId());
		return examInitiateResDto;
	}
	
	
	
	
	
	private ExamInitiateResDto toExamInitiateResDto(Exam exam) {
		return ExamInitiateResDto.builder()
				.examId(exam.getExamId())
				.examStatus(exam.getExamStatus())
				.applicationId(exam.getApplicationId())
				.userId(exam.getUserId())
				.duration(exam.getDuration())
				.sessionId(exam.getSessionId())
				.build();
		
	}

}
