package com.skillverify.companyservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MissingFieldDto {
	private String field;
    private String message;

}
