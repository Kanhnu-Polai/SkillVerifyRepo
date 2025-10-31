package com.skillverify.companyservice.service;

import com.skillverify.companyservice.dto.CompanyDto;
import com.skillverify.companyservice.entity.Company;

public interface CompanyService {
	
	Company createCompany(CompanyDto companyDto);

}
