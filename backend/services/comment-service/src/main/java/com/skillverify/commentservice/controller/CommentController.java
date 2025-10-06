package com.skillverify.commentservice.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillverify.commentservice.entity.Comment;
import com.skillverify.commentservice.service.CommentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("http://localhost:5173")
public class CommentController {
	
	private final CommentService commentService;
	
	
	@PostMapping("/add")
	public ResponseEntity<Comment> addComment(@RequestParam String text,@RequestParam String userName,@RequestParam String photoUrl, @RequestParam Long userId,@RequestParam UUID postId) {
		log.info("✅ CommentController: addComment called with Comment info : {}", text);
	Comment comment = 	commentService.addComment(postId, text, userId,userName,photoUrl);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(comment);
	}
	
	@PostMapping("/reply")
	public ResponseEntity<Comment> replyToComment(@RequestParam UUID commentId,@RequestParam String userName,@RequestParam String photoUrl, @RequestParam String text, @RequestParam Long userId) {
		log.info("✅ CommentController: replyToComment called with Comment info : {}", text);
		Comment reply = 	commentService.replyToComment(commentId, text, userId,userName,photoUrl);
		return ResponseEntity.status(HttpStatus.CREATED).body(reply);
		}
		
	@GetMapping("/by-post")
	public ResponseEntity<List<Comment>> getCommentsByPostId(@RequestParam UUID postId) {
		log.info("✅ CommentController: getCommentsByPostId called for Post ID : {}", postId);
		List<Comment> comments = commentService.getCommentsByPostId(postId);
		return ResponseEntity.status(HttpStatus.OK).body(comments);
	}

}
