package com.skillverify.examservice.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillverify.examservice.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, UUID> {
	
	Optional<Exam> findByUserIdAndApplicationId(Long userId, UUID applicationId);

}
