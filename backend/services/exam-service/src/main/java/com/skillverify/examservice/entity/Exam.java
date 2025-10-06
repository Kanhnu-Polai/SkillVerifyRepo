package com.skillverify.examservice.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.skillverify.examservice.enums.ExamStatus;

import jakarta.annotation.PostConstruct;
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
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "exam_info_db")
@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor

public class Exam {
	
	@Id
	@GeneratedValue
	private UUID examId;
	
    @Column(nullable = false)
	private UUID jobId;
    
    @Column(nullable = false)
    private UUID applicationId;
	
    @Column(nullable = false)
	private String applicantEmail;
    
    @Column(nullable = false)
    private String publisherEmail;
	
	@Enumerated(EnumType.STRING)
	private ExamStatus status;
	
	private LocalDateTime scheduleTime;
	private int roundOneScore;
	private int roundTwoScore;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	@PostConstruct
	private void onCreate() {
		this.createdAt = LocalDateTime.now();
		
	}
	
	@PostConstruct
	private void onUpdate() {
		this.updatedAt = LocalDateTime.now();
	}

}
