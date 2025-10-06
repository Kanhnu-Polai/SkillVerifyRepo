package com.skillverify.commentservice.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.skillverify.commentservice.entity.Comment;
import com.skillverify.commentservice.http.HttpServiceEngine;
import com.skillverify.commentservice.repository.CommentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {
	
	private final CommentRepository repository;
	private final HttpServiceEngine httpServiceEngine;

	@Override
	public Comment addComment(UUID postId, String text, Long userId,String userName,String photoUrl) {
		log.info("✅ CommentServiceImpl: addComment called with Comment info : {}", text);
		
		// Call Post Service to update comment count
		String response = httpServiceEngine.callPostService(postId);
		log.info("✅ CommentServiceImpl: addComment Post Service response : {}", response);
		if(response.contains("Error")) {
			throw new RuntimeException("Failed to update Post comment count");
		}
		
		
		Comment comment = Comment.builder()
				.postId(postId)
				.userId(userId)
				.content(text).
				userName(userName)
				.photoUrl(photoUrl)
				.createdAt(Instant.now().toEpochMilli())
				.likesCount(0)
				.dislikesCount(0)
				.build();
		log.info("✅ CommentServiceImpl: addComment saving Comment : {}", comment);
		
		return repository.save(comment);
	}

	@Override
	public List<Comment> getCommentsByPostId(UUID postId) {
		List<Comment> comments = repository.findByPostId(postId);
		return comments;
	}


	@Override
	public Comment replyToComment(UUID commentId, String text, Long userId,String userName,String photoUrl) {
		log.info("✅ CommentServiceImpl: replyToComment called with Comment info : {}", text);
	    Comment parent = repository.findById(commentId)
	            .orElseThrow(() -> new RuntimeException("Comment not found"));

	    Comment reply = Comment.builder()
	            .postId(parent.getPostId())
	            .userId(userId)
	            .userName(userName)
	            .photoUrl(photoUrl)
	            .content(text)
	            .createdAt(Instant.now().toEpochMilli())
	            .likesCount(0)
	            .dislikesCount(0)
	            .build();

	    log.info("✅ CommentServiceImpl: replyToComment saving Reply Comment : {}", reply);
	    // Save reply node first
	    Comment savedReply = repository.save(reply);

	    // Initialize replies if null
	    if (parent.getReplies() == null) {
	        parent.setReplies(new ArrayList<>());
	    }

	    // Attach reply to parent
	    parent.getReplies().add(savedReply);

	    // Save parent again to create relationship
	    repository.save(parent);
	    log.info("✅ CommentServiceImpl: replyToComment saved Reply Comment : {}", savedReply);

	    return savedReply;
	}

	@Override
	public Comment likeComment(UUID commentId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comment dislikeComment(UUID commentId) {
		// TODO Auto-generated method stub
		return null;
	}

}
