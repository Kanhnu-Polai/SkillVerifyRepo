package com.skillverify.companyservice.dto;

import java.util.List;

import com.skillverify.companyservice.contants.CompanyType;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CompanyDto {
	


	
	
	@NotNull(message = "Company name cannot be null")
    private String companyName;
	
	@NotNull(message = "Created User ID cannot be null")
	private Long createdUserId;
    
	@NotNull(message = "Company description cannot be null")
    private String companyDescription;
	
	
    private List<CompanyType> companyTypes;
    private int numberOfBranches;
    private int numberOfEmployees;
    private String website;
    private String logoUrl;
   

    private List<String> services; // e.g., ["Consulting", "Software Development"]

    private List<BranchDto> branches;
    private List<ProductDto> products;
}
