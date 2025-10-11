package com.skillverify.likeservice.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skillverify.likeservice.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {
	
	public Like findByUserIdAndPostId(Long userId, UUID postId);
	
	    @Query("SELECT l.postId FROM Like l WHERE l.userId = :userId AND l.isLiked = true")
	    List<UUID> findLikedPostIdsByUserId(@Param("userId") Long userId);
	

}
