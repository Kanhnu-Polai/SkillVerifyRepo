package com.skillverify.companyservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.companyservice.dto.CompanyDto;
import com.skillverify.companyservice.entity.Company;
import com.skillverify.companyservice.service.CompanyService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/companies")
@Slf4j
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
	
	@PostMapping("/test")
	public String test() {
		return "Company Service is up and running!";
	}
	
	
	@PostMapping("/create")
	public ResponseEntity<Company> createCompany(@Valid @RequestBody CompanyDto companyDto) {
		log.info("✅ Received request to create company: {}", companyDto);
		Company company = companyService.createCompany(companyDto);
		return ResponseEntity.ok(company);
	}

}
