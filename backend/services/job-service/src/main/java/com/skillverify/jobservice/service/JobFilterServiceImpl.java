package com.skillverify.jobservice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.skillverify.jobservice.dto.JobFilterRequest;
import com.skillverify.jobservice.entity.Job;
import com.skillverify.jobservice.repository.JobRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobFilterServiceImpl implements JobFilterService {
	
	
	private final JobRepository jobRepository;


	@Override
	public List<Job> filterJobs(JobFilterRequest filterRequest) {
	    if (filterRequest == null) {
	        throw new IllegalArgumentException("Filter request cannot be null");
	    }

	    Specification<Job> specification = Specification.where(null);

	    try {
	        List<String> companyTypes = new ArrayList<>();

	        if (Boolean.TRUE.equals(filterRequest.isStartup())) {
	            companyTypes.add("Startup");
	        }
	        if (Boolean.TRUE.equals(filterRequest.isMnc())) {
	            companyTypes.add("MNC");
	        }
	        if (Boolean.TRUE.equals(filterRequest.isProductBased())) {
	            companyTypes.add("Product-Based");
	        }

	        if (!companyTypes.isEmpty()) {
	            specification = specification.and((root, query, cb) ->
	                    root.get("companyType").in(companyTypes)
	            );
	        }

	        if (filterRequest.getSalaryRange() != null && filterRequest.getSalaryRange().size() == 2) {
	            Integer min = filterRequest.getSalaryRange().get(0);
	            Integer max = filterRequest.getSalaryRange().get(1);
	            specification = specification.and((root, query, cb) ->
	                    cb.between(root.get("salary"), min, max)
	            );
	        }

	        if (filterRequest.getExperience() != null && !filterRequest.getExperience().isEmpty()) {
	            specification = specification.and((root, query, cb) ->
	                    cb.equal(root.get("experience"), filterRequest.getExperience())
	            );
	        }

	        if (filterRequest.getHashTags() != null && !filterRequest.getHashTags().isEmpty()) {
	            specification = specification.and((root, query, cb) ->
	                    root.join("hashTags").in(filterRequest.getHashTags())
	            );
	        }

	        if (filterRequest.getJobType() != null && !filterRequest.getJobType().isEmpty()) {
	            specification = specification.and((root, query, cb) ->
	                    cb.equal(root.get("jobType"), filterRequest.getJobType())
	            );
	        }

	    } catch (Exception e) {
	        log.error("Error while building job filter: {}", e.getMessage());
	        throw new RuntimeException("Invalid filter data provided", e);
	    }

	    return jobRepository.findAll(specification);
	}
}
