package com.skillverify.jobservice.dto;

import java.util.List;

import lombok.Data;

@Data
public class JobFilterRequest {
	private String sort;
	private boolean startup;
	private boolean mnc;
    private boolean productBased;
    
    
    private String experience;
    private List<Integer> salaryRange;
    private List<String> hashTags;
    
    private String jobType;
    

}
