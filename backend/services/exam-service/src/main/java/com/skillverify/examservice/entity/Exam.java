package com.skillverify.examservice.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.skillverify.examservice.constant.ExamStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Exam {
	
	
	
	@Id
	@GeneratedValue
	@Column(columnDefinition = "BINARY(16)")
	private UUID examId;
	
	
	private UUID applicationId;
	private Long userId;
	private UUID questionBankId;
	private UUID proctoringId;
	
	private UUID questionSetId;
	private String candidateImageUrl;
	
	
	

	
	
	
	@Enumerated(EnumType.STRING)
	private ExamStatus examStatus;
	
	private UUID sessionId;
	private String cheatingPercentage;
	
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private String duration;

	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	
	
	
	
	
	

}
