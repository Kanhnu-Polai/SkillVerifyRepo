package com.skillverify.postservice.dto;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateLIkeDto {
	private UUID postId;
	private Boolean isLiked;

}
