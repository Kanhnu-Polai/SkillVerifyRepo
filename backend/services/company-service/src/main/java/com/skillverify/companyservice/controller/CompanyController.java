package com.skillverify.companyservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
@CrossOrigin(origins = "http://localhost:5173")
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
	
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Company>> getAllCompanies(@PathVariable Long userId) {
		log.info("✅ Received request to get all companies");
		List<Company> companies = companyService.getAllCompanies(userId);
		return ResponseEntity.ok(companies);
	}

}
