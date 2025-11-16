package com.skillverify.postservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

import com.skillverify.postservice.dto.PostCreationDto;
import com.skillverify.postservice.entity.Post;

public interface PostService {
	public Post createPost(PostCreationDto postCreationDto);
	public List<Post> getTrendingPosts();
	public ResponseEntity<Post> updateLikeCount(  UUID postId, Boolean isLiked);
	public Post updateCommentCount( UUID postId);
	public List<Post> getCurrentUserPosts(Long userId);
	public List<Post> getPostByCategory(String category);
	

}
