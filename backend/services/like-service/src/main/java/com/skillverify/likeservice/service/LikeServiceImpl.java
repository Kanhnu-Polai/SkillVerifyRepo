package com.skillverify.likeservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillverify.likeservice.dto.LikeDto;
import com.skillverify.likeservice.entity.Like;
import com.skillverify.likeservice.http.PostServiceEnginee;
import com.skillverify.likeservice.repository.LikeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
	
	private final LikeRepository likeRepository;
	private final PostServiceEnginee postServiceEnginee;

	@Override
	public ResponseEntity<Like> updateLike(LikeDto likeDto) {
	    log.info("✅ LikeServiceImpl: updateLike called with LikeDto : {}", likeDto);

	    try {
	        Like like = likeRepository.findByUserIdAndPostId(likeDto.getUserId(), likeDto.getPostId());

	        if (like != null) {
	            // Existing like found → update
	            log.info("✅ Found existing Like: {}", like);

	            like.setIsLiked(likeDto.getIsLiked());
	            like.setUpdatedAt(LocalDateTime.now());

	            // Update post like counter
	            postServiceEnginee.updatePostLikes(likeDto.getPostId(), likeDto.getIsLiked());
	            postServiceEnginee.updatePostLikes(likeDto.getPostId(), !likeDto.getIsLiked());

	            Like updatedLike = likeRepository.save(like);
	            log.info("✅ Updated existing Like: {}", updatedLike);

	            return ResponseEntity.status(HttpStatus.OK).body(updatedLike);
	        } else {
	            // No existing like → create new
	            log.info("✅ No existing Like found, creating new");

	            Like newLike = new Like();
	            newLike.setPostId(likeDto.getPostId());
	            newLike.setUserId(likeDto.getUserId());
	            newLike.setIsLiked(likeDto.getIsLiked());
	            newLike.setCreatedAt(LocalDateTime.now());

	            // Update post like counter
	            postServiceEnginee.updatePostLikes(likeDto.getPostId(), likeDto.getIsLiked());

	            Like savedLike = likeRepository.save(newLike);
	            log.info("✅ Created new Like: {}", savedLike);

	            return ResponseEntity.status(HttpStatus.CREATED).body(savedLike);
	        }

	    } catch (Exception e) {
	        log.error("❌ Error updating like: {}", e.getMessage(), e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	@Override
	public List<UUID> getAllLikedPostId(Long userId) {
		log.info("✅ LikeServiceImpl: getAllPostId called with userId : {}", userId);
		List<UUID> likedPostIds = likeRepository.findLikedPostIdsByUserId(userId);
		
				
		return likedPostIds;
	}

}
