package com.skillverify.applicationservice.dto;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationIDFoundResponse {
	
	private UUID applicationId;
	private boolean found;

}
