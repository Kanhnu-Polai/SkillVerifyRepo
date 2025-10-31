package com.skillverify.companyservice.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.skillverify.companyservice.contants.CompanyType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Company {
	
	@Id
	@GeneratedValue
	private UUID id;
	private Long createdUserId;
	
	
	private String companyName;
	private String companyDescription;
	
	@ElementCollection(targetClass = CompanyType.class)
	@Enumerated(EnumType.STRING)
	private List<CompanyType> companyTypes;
	
	
	@OneToMany(mappedBy = "company" , cascade = CascadeType.ALL ,orphanRemoval = true)
	@JsonManagedReference
	private List<Branch> branch;
	
	private int numberOfBranches;
	private int numberOfEmployees;
	private String website;
	private String logoUrl;
	
	
	@ElementCollection
	private List<String> services;
	
	@OneToMany(mappedBy = "company" , cascade = CascadeType.ALL , orphanRemoval = true)
	@JsonManagedReference
	private List<Products> products;
	
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	

}
