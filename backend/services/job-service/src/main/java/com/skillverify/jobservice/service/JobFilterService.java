package com.skillverify.jobservice.service;

import java.util.List;

import com.skillverify.jobservice.dto.JobFilterRequest;
import com.skillverify.jobservice.entity.Job;

public interface JobFilterService {
	
	List<Job> filterJobs(JobFilterRequest filterRequest);

}
