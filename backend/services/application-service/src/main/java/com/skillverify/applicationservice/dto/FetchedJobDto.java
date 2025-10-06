package com.skillverify.applicationservice.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.skillverify.applicationservice.constant.JobStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class FetchedJobDto {
	private UUID jobId;
    private String publisherEmail;
    private String companyName;
    private String jobTitle;
    private String jobDescription;
    private Integer noOfOpenings;
    private LocalDate lastDateToApply;
    private String jobType;
    private String jobCategory;
    private String companyPhotoLink;
    private String publicPhotoId;
    private Integer numberOfCandidatesShortlisted;
    private Integer numberCandidateApply;
    private Integer experience;
    private List<String> location;
    private List<String> requiredSkill;
    private List<String> examTopics;
    private LocalDateTime createdAt;
    private Boolean examRequired;
    private Boolean round1Required;
    private Boolean round2Required;
    private JobStatus status;

}
