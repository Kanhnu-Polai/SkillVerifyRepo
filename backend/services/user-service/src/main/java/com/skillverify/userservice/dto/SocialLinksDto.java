package com.skillverify.userservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SocialLinksDto {

	
	private String email;
	private String linkedinUrl;
	private String githubUrl;
	private String facebookUrl;
	private String instagramUrl;
	private String twitterUrl;
	private String portfolioUrl;
	private String youtubeUrl;
	


}
