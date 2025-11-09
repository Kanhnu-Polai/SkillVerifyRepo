package com.skillverify.applicationservice.entity;

import com.skillverify.applicationservice.constant.JobStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Represents a single job-application record.
 */
@Entity
@Table(name = "job_applications")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)   // JPA-mandatory ctor
@AllArgsConstructor                                  // Useful for tests
@Builder(toBuilder = true)
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

  
    @Column(name = "application_id", nullable = false, updatable = false, unique = true, length = 64)
    private UUID applicationId;

    @Column(name = "job_id", nullable = false, columnDefinition = "BINARY(16)")
    private UUID jobId;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(nullable = false)
    private String email;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status;   // e.g. APPLIED, INTERVIEWED, HIRED, REJECTED

    @Column(name = "applied_at", nullable = false)
    private LocalDateTime appliedAt;

    /* -------------------------------------------------
       Auto-populate fields just before the INSERT
       ------------------------------------------------- */
    @PrePersist
    private void prePersist() {
        if (applicationId == null) {
            // 👉 For “APP-001” style IDs, inject a custom generator here
            applicationId = UUID.randomUUID().toString();
        }
        if (appliedAt == null) {
            appliedAt = LocalDateTime.now();
        }
        if (status == null) {
            status = JobStatus.APPLIED;
        }
    }
}