package com.skillverify.postservice.dto;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostCreationDto {
	@NotNull(message = "User ID cannot be blank")
	private Long userId;
	private List<String> hashTags;
	
	@NotBlank(message = "Title cannot be blank")
	private String title;
	
	
	private String userName; // Store user name for quick access
	
	private String userPhotoUrl; // Store user photo URL for quick access
	
	private String userRole; // Store user role for quick access
	
	
	private String description;

	private String imageUrl;
	@NotBlank(message = "Category cannot be blank")
	private String category;
	
	@NotBlank(message = "Status cannot be blank")
	private String status; 
	
	

}
