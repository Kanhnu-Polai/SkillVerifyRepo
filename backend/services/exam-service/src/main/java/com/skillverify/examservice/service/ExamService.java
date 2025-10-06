package com.skillverify.examservice.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skillverify.examservice.dto.ScheduleExamRequest;
import com.skillverify.examservice.repository.ExamRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ExamService {

	private final ExamRepository respository;

	
	@Transactional
	public String scheduleExam(ScheduleExamRequest request, String emailFromToken) {
		log.info("ExamService || scheduleExam() called for jobId: {} by {}", request.getJobId(), emailFromToken);

		
	
				

		
		
		
		return "Exam scheduled successfully";
	
	}

}
