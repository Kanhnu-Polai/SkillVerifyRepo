package com.skillverify.companyservice.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skillverify.companyservice.dto.CompanyDto;
import com.skillverify.companyservice.entity.Address;
import com.skillverify.companyservice.entity.Branch;
import com.skillverify.companyservice.entity.Company;
import com.skillverify.companyservice.entity.Products;
import com.skillverify.companyservice.repository.CompanyRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
	
	
	private final CompanyRepository companyRepository;

	@Override
	public Company createCompany(CompanyDto companyDto) {
		log.info("✅ Creating company: {}", companyDto);
		
		Company company = Company.builder()
				.companyName(companyDto.getCompanyName())
				.companyDescription(companyDto.getCompanyDescription())
				.companyTypes(companyDto.getCompanyTypes())
				.numberOfBranches(companyDto.getNumberOfBranches())
				.numberOfEmployees(companyDto.getNumberOfEmployees())
				.website(companyDto.getWebsite())
				.logoUrl(companyDto.getLogoUrl())
				.services(companyDto.getServices())
				.createdUserId(companyDto.getCreatedUserId())
				.createdAt(LocalDateTime.now())
				.updatedAt(LocalDateTime.now())
				.build();
		
		
		if(companyDto.getBranches() !=null && !companyDto.getBranches().isEmpty()) {
			log.info("✅ Mapping branches for company: {}", companyDto.getCompanyName());
			List<Branch> branches = mapAddressToBranches(companyDto, company);
			company.setBranch(branches);
		}
		
		if(companyDto.getProducts() !=null && !companyDto.getProducts().isEmpty()) {
			log.info("✅ Mapping products for company: {}", companyDto.getCompanyName());
			List<Products> products = mapProducts(companyDto, company);
			company.setProducts(products);
		}
		company = companyRepository.save(company);
		log.info("✅ Company created with ID: {}", company.getId());
		
		return company;
	}
	
	private List<Branch> mapAddressToBranches(CompanyDto companyDto, Company company) {
	    return companyDto.getBranches().stream()
	            .map(branchDto -> {
	                Address address = Address.builder()
	                        .street(branchDto.getAddress().getStreet())
	                        .city(branchDto.getAddress().getCity())
	                        .state(branchDto.getAddress().getState())
	                        .zipCode(branchDto.getAddress().getZipCode())
	                        .country(branchDto.getAddress().getCountry())
	                        .build();

	                return Branch.builder()
	                        .branchName(branchDto.getBranchName())
	                        .headQuarter(branchDto.isHeadQuarter())
	                        .address(address)
	                        .company(company) 
	                        .build();
	            })
	            .toList();
	}
	
	
private List<Products> mapProducts(CompanyDto companyDto, Company company) {
	List<Products> products = companyDto.getProducts().stream()
            .map(productDto -> Products.builder()
                    .productName(productDto.getProductName())
                    .productDescription(productDto.getProductDescription())
                    .productWebsite(productDto.getProductWebsite())
                    .productLogoUrl(productDto.getProductLogoUrl())
                    .company(company) 
                    .build())
            .toList();
	
	return products;
	                
	                    
	                    
	                    
	            
	}
		

}
