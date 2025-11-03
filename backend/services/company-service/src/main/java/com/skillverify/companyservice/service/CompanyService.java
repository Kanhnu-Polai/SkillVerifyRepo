package com.skillverify.companyservice.service;

import java.util.List;

import com.skillverify.companyservice.dto.CompanyDto;
import com.skillverify.companyservice.entity.Company;

public interface CompanyService {
	
	Company createCompany(CompanyDto companyDto);

	List<Company> getAllCompanies(Long userId);

}
