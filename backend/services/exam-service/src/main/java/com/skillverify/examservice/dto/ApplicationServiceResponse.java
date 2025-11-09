package com.skillverify.examservice.dto;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationServiceResponse {
	
	private UUID applicationId;

}
