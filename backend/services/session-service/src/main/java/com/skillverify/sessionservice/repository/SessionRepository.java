package com.skillverify.sessionservice.repository;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.skillverify.sessionservice.entity.ExamSession;

@Repository
public interface SessionRepository extends MongoRepository<ExamSession, UUID> {

	ExamSession findByExamIdAndCandidateId(UUID examId, Long candidateId);


}
