package com.skillverify.companyservice.dto;

import java.util.List;

import com.skillverify.companyservice.contants.CompanyType;

import lombok.Data;

@Data
public class CompanyDto {
	

    private String companyName;
    private String companyDescription;
    private List<CompanyType> companyTypes;
    private int numberOfBranches;
    private int numberOfEmployees;
    private String website;
    private String logoUrl;
    private Long createdUserId;

    private List<String> services; // e.g., ["Consulting", "Software Development"]

    private List<BranchDto> branches;
    private List<ProductDto> products;
}
