package com.skillverify.userservice.dto;

import java.io.Serializable;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyCreatedEvent implements Serializable {

	private static final long serialVersionUID = 1L;
	 private UUID companyId;
	    private Long userId;
	    private String companyName;

}
