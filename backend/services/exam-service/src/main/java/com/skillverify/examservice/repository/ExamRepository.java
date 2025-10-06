package com.skillverify.examservice.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillverify.examservice.entity.Exam;

public interface ExamRepository  extends JpaRepository<Exam, UUID>{
	
	List<Exam> findByEmail(String email);
	
	List<Exam> findByJobId(UUID jobId);
	boolean existsByJobIdAndEmail(UUID jobId, String email);
}
