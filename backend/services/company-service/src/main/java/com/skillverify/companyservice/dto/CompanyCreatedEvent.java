package com.skillverify.companyservice.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CompanyCreatedEvent {
    private UUID companyId;
    private Long userId;
    private String companyName;
}