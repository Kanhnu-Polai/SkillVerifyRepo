package com.skillverify.companyservice.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.stereotype.Service;

import com.skillverify.companyservice.dto.CompanyCreatedEvent;
import com.skillverify.companyservice.dto.CompanyDto;
import com.skillverify.companyservice.entity.Address;
import com.skillverify.companyservice.entity.Branch;
import com.skillverify.companyservice.entity.Company;
import com.skillverify.companyservice.entity.Products;
import com.skillverify.companyservice.messaging.CompanyEventProducer;
import com.skillverify.companyservice.repository.CompanyRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final AmqpAdmin amqpAdmin;
	
	
	private final CompanyRepository companyRepository;
	private final CompanyEventProducer companyEventProducer;

    

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
		
		CompanyCreatedEvent event = CompanyCreatedEvent.builder()
				.userId(company.getCreatedUserId())
				.companyId(company.getId())
				.companyName(company.getCompanyName())
				.build();
		
		companyEventProducer.sendCompanyCreatedMessage(event);
		
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

@Override
public List<Company> getAllCompanies(Long userId) {
	// check if userId is provided
	// check in db and return companies for that userId
	
	log.info("✅ Fetching companies for userId: {}", userId);
	List<Company> companies = companyRepository.findByCreatedUserId(userId);
	log.info("✅ Found {} companies for userId: {}", companies.size(), userId);
	return companies;
}
		

}
