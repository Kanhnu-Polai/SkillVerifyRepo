package com.skillverify.companyservice.dto;

import lombok.Data;

@Data
public class BranchDto {
    private String branchName;
    private boolean headQuarter;
    private AddressDto address;
}