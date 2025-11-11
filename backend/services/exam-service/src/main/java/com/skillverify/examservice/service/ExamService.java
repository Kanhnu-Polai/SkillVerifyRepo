package com.skillverify.examservice.service;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.skillverify.examservice.dto.ExamInitiateReqDto;
import com.skillverify.examservice.dto.ExamInitiateResDto;

public interface ExamService {
	
	
	ExamInitiateResDto initiateExam(ExamInitiateReqDto examInitiateReqDto,MultipartFile file);
	
	void startExam(UUID examId);

}
