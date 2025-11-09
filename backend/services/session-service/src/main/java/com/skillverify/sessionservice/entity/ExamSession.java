package com.skillverify.sessionservice.entity;

import java.time.Instant;
import java.util.UUID;

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
	private UUID sessionId;
	private Long candidateId;
	private UUID applicationId;
	private UUID examId;
	private SessionStatusEnum status ;
	private Instant sessionCreationTime;
	private Instant sessionDestroyTime;
	private Long sessionDurationMinutes;
	private String mobileProctoringDataUrl;
	private String desktopCameraProctoringDataUrl;
	private String screenRecordingProctoringDataUrl;
	private String mobileCameraProctoringDataUrl;
	private Instant lastActivityTime;
	
	
	

}
