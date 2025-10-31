package com.skillverify.sessionservice.entity;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.skillverify.sessionservice.contant.SessionStatusEnum;

import lombok.Builder;
import lombok.Data;

@Document(collection = "exam_sessions")
@Data
@Builder
public class ExamSession {
	
	
	@Id
	private String sessionId;
	private String candidateId;
	private String applicationId;
	private String examId;
	private SessionStatusEnum status ;
	private Instant sessionCreationTime;
	private Instant sessionDestroyTime;
	private Long sessionDurationMinutes;
	private String proctoringDataUrl;
	private String mobileCameraProctoringDataUrl;
	private Instant lastActivityTime;
	
	
	

}
