package com.skillverify.likeservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.likeservice.dto.LikeDto;
import com.skillverify.likeservice.entity.Like;
import com.skillverify.likeservice.service.LikeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/likes")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class LikeController {
	
	private final LikeService likeService;
	
	@PostMapping("/update-like")
	public ResponseEntity<Like> updateLike(@RequestBody LikeDto likeDto) {
		log.info("✅ LikeController: updateLike called with Like info : {}", likeDto.getIsLiked());
		
	ResponseEntity<Like> like = 	likeService.updateLike(likeDto);
		return like;
	}
	
	
	

}
