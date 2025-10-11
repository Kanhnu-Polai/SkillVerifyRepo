package com.skillverify.likeservice.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.likeservice.contants.ErrorCodeEnum;
import com.skillverify.likeservice.dto.LikeDto;
import com.skillverify.likeservice.entity.Like;
import com.skillverify.likeservice.exceptions.UserIdNotProvidedException;
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
		
	ResponseEntity<Like> like =likeService.updateLike(likeDto);
		return like;
	}
	
	
	@GetMapping("/get-post-id")
	public ResponseEntity<List<UUID>> getPostIdByUserId(@RequestParam Long userId) {
		log.info("✅ LikeController: getPostIdByUserId called with userId : {}", userId);
		if(userId == null) {
			throw new UserIdNotProvidedException(ErrorCodeEnum.USER_NOT_PROVIDED_EXCEPTION);
		}
		
		// Call the service method to get the postId by userId
		List<UUID> ids =  likeService.getAllLikedPostId(userId);
		
		
		return ResponseEntity.ok().body(ids);
	}
	
	
	

}
