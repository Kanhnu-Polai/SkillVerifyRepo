package com.skillverify.likeservice.service;

import org.springframework.http.ResponseEntity;

import com.skillverify.likeservice.dto.LikeDto;
import com.skillverify.likeservice.entity.Like;

public interface LikeService {
	
	public ResponseEntity<Like> updateLike(LikeDto likeDto);

}
