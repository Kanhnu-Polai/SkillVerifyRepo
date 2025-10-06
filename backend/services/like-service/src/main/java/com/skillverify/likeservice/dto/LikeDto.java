package com.skillverify.likeservice.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class LikeDto {
	private Long userId;
	private UUID postId;
	private Boolean isLiked;

}
