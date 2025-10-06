package com.skillverify.postservice.contant;



public enum ErrorCodeEnum {
	
	POST_VALIDATION_TITLE_BLANK("POST-SERVICE-0001", "Post title cannot be blank"),
	POST_VALIDATION_CATEGORY_BLANK("POST-SERVICE-0002", "Post category cannot be blank"),
	POST_VALIDATION_STATUS_BLANK("POST-SERVICE-0003", "Post status cannot be blank"),
	POST_VALIDATION_USERID_BLANK("POST-SERVICE-0004", "User ID cannot be blank"),
	IMAGE_FILE_UPLOAD_ERROR("POST-SERVICE-0005", "Error uploading image file"),
	POST_NOT_FOUND("POST-SERVICE-0006", "Post not found"),;
	
	
	 private final String code;
    private final String errorMessage;
    
    
    ErrorCodeEnum(String code, String errorMessage) {
		this.code = code;
		this.errorMessage = errorMessage;
	}
    
    public String getCode() {
		return code;
	}

	public String getMessage() {
		return errorMessage;
	}
	

}
