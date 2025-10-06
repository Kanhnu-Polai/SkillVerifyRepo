package com.skillverify.postservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillverify.postservice.contant.ErrorCodeEnum;
import com.skillverify.postservice.dto.PostCreationDto;
import com.skillverify.postservice.entity.Post;
import com.skillverify.postservice.exception.PostNotFoundException;
import com.skillverify.postservice.repository.PostRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
	
	private final PostRepository repository;

	@Override
	public Post createPost(PostCreationDto postCreationDto) {
		log.info("✅ PostServiceImpl---->createPost() called with for userId: {}", postCreationDto.getUserId());
		log.info("✅ Setting all values to entity and saving to DB");
		Post post = Post.builder()
				.userId(postCreationDto.getUserId())
				.userName(postCreationDto.getUserName())
				.userPhotoUrl(postCreationDto.getUserPhotoUrl())
				.userRole(postCreationDto.getUserRole())
				.title(postCreationDto.getTitle())
				.hashTags(postCreationDto.getHashTags())
				.description(postCreationDto.getDescription())
				.imageUrl(postCreationDto.getImageUrl())
				.category(postCreationDto.getCategory())
				.status(postCreationDto.getStatus())
				.isActive(true)
				.likeCount(0L)
				.shareCount(0L)
				.saveCount(0L)
				.commentCount(0L)
				.isPinned(false)
				.createdAt(LocalDateTime.now())
				.updatedAt(LocalDateTime.now())
				.build();
		
		log.info("✅ Post entity constructed: {}", post);
		post=  repository.save(post);
		
		if(post != null) {
			log.info("✅ Post saved successfully with ID: {}", post.getPostId());
		} else {
			log.error("❌ Failed to save post for userId: {}", postCreationDto.getUserId());
		}
		
		return post;
	}

	@Override
	public List<Post> getTrendingPosts() {
		LocalDateTime since= LocalDateTime.now().minusDays(7);
		log.info("✅ PostServiceImpl---->getTrendingPosts() called to fetch posts since: {}", since);
		List<Post> trendingPosts = null;
		try {
			 trendingPosts= repository.findTrendingPosts(since);
			 log.info("✅ Retrieved {} trending posts", trendingPosts.size());
			
		} catch (Exception e) {
			throw new RuntimeException("❌ Error fetching trending posts: " + e.getMessage());
		}
		
		return trendingPosts;
	}

	@Override
	public ResponseEntity<Post> updateLikeCount(UUID postId, Boolean isLiked) {
	    log.info("✅ PostServiceImpl---->updateLikeCount() called for postId: {} with isLiked: {}", postId, isLiked);

	    Post post = repository.findById(postId)
	            .orElseThrow(() -> new PostNotFoundException(ErrorCodeEnum.POST_NOT_FOUND));

	    log.info("✅ Fetched Post from DB: {}", post);
	    Long currentLikes = post.getLikeCount() == null ? 0 : post.getLikeCount();

	    if (isLiked) {
	        post.setLikeCount(currentLikes + 1);
	        log.info("✅ Incremented like count for postId: {} to {}", postId, post.getLikeCount());
	    } else {
	        // Ensure likeCount does not go below zero
	        post.setLikeCount(Math.max(0, currentLikes - 1));
	        log.info("✅ Decremented like count for postId: {} to {}", postId, post.getLikeCount());
	    }

	    // Save updated post
	    Post updatedPost = repository.save(post);

	    return ResponseEntity.ok(updatedPost);
	}

	@Override
	public Post updateCommentCount(UUID postId) {
		log.info("✅ PostServiceImpl---->updateCommentCount() called for postId: {}", postId);
		 Post post = repository.findById(postId)
		            .orElseThrow(() -> new PostNotFoundException(ErrorCodeEnum.POST_NOT_FOUND));
		 
		 Long currentComments = post.getCommentCount() == null ? 0 : post.getCommentCount();
		 post.setCommentCount(currentComments + 1);
		 log.info("✅ Incremented comment count for postId: {} to {}", postId, post.getCommentCount());
		 Post updatedPost = repository.save(post);
		 return updatedPost;
		
	}

}
