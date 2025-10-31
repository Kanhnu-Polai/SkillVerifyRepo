package com.skillverify.companyservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillverify.companyservice.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, UUID> {

}
