package com.skillverify.examservice.service;

import com.skillverify.examservice.dto.ExamInitiateReqDto;
import com.skillverify.examservice.dto.ExamInitiateResDto;

public interface ExamService {
	
	
	ExamInitiateResDto initiateExam(ExamInitiateReqDto examInitiateReqDto);

}
