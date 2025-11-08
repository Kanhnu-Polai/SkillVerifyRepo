package com.skillverify.applicationservice.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillverify.applicationservice.entity.JobApplication;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
    JobApplication findByEmailAndJobId(String email, UUID jobId);

    List<JobApplication> findByEmail(String email);

    @Query("SELECT ja.jobId FROM JobApplication ja WHERE ja.email = :email")
    List<UUID> findJobIdsByEmail(@Param("email") String email);
    
    @Query("SELECT a.applicationId FROM JobApplication a WHERE a.email = :email AND a.jobId = :jobId")
    Optional<UUID> findApplicationIdByEmailAndJobId(@Param("email") String email, @Param("jobId") String jobId);
}