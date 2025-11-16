package com.skillverify.postservice.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skillverify.postservice.entity.Post;

public interface PostRepository extends JpaRepository<Post, UUID> {
	
	@Query("SELECT p FROM Post p " +
		       "WHERE p.createdAt >= :since " +
		       "ORDER BY (p.likeCount + p.shareCount + p.commentCount) DESC")
		List<Post> findTrendingPosts(@Param("since") LocalDateTime since);
	
	
	@Query("SELECT p FROM Post p JOIN p.category c WHERE LOWER(c) = LOWER(:category)")
	List<Post> findPostsByCategory(@Param("category") String category);
	
	
	List<Post> findByUserIdOrderByCreatedAtDesc(Long userId);


}
