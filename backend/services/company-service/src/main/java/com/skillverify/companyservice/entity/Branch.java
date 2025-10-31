package com.skillverify.companyservice.entity;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;


@Entity
@Data
@Builder
public class Branch {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String branchName;
	
	private boolean headQuarter;
	
	@ManyToOne
	@JoinColumn(name = "company_id")
	private Company company;
	
	@Embedded
	private Address address;
	

}
