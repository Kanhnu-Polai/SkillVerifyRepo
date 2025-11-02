package com.skillverify.companyservice.contants;

public enum ErrorCodeEnum {
	
	COMPANY_NOT_FOUND("COMPANY_NOT_FOUND", "The specified company was not found."),
	COMPANY_CREATION_INVALID_DATA("COMPANY_CREATION_INVALID_DATA", "Invalid data provided for company creation."),
	INVALID_COMPANY_DATA("INVALID_COMPANY_DATA", "The provided company data is invalid."),
	COMPANY_CREATION_FAILED("COMPANY_CREATION_FAILED", "Failed to create the company due to an internal error."),
	COMPANY_UPDATE_FAILED("COMPANY_UPDATE_FAILED", "Failed to update the company due to an internal error."),
	COMPANY_DELETION_FAILED("COMPANY_DELETION_FAILED", "Failed to delete the company due to an internal error.");

	private final String code;
	private final String message;

	ErrorCodeEnum(String code, String message) {
		this.code = code;
		this.message = message;
	}

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

}
