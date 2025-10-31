package com.skillverify.sessionservice.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.skillverify.sessionservice.entity.ExamSession;

@Repository
public interface SessionRepository extends MongoRepository<ExamSession, String> {

	Optional<ExamSession> findByExamIdAndCandidateId(String examId, String candidateId);


}
