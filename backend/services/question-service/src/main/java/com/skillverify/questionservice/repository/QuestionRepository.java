package com.skillverify.questionservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillverify.questionservice.entity.Question;


public interface QuestionRepository extends JpaRepository<Question, UUID>{
	
	

}
