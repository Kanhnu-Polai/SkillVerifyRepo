package com.skillverify.likeservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

import com.skillverify.likeservice.dto.LikeDto;
import com.skillverify.likeservice.entity.Like;

public interface LikeService {
	
	public ResponseEntity<Like> updateLike(LikeDto likeDto);
	public List<UUID> getAllLikedPostId(Long userId);

}
