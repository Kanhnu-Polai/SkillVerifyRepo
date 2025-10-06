package com.skillverify.likeservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillverify.likeservice.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {
	
	public Like findByUserIdAndPostId(Long userId, UUID postId);

}
