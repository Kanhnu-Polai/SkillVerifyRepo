package com.skillverify.commentservice.service;

import java.util.List;
import java.util.UUID;

import com.skillverify.commentservice.entity.Comment;

public interface CommentService {
	
	public Comment addComment(UUID postId, String text, Long userId,String userName,String photoUrl);
	public List<Comment> getCommentsByPostId(UUID postId);
	public Comment replyToComment(UUID commentId, String text,Long userId,String userName,String photoUrl);
	public Comment likeComment(UUID commentId);
	public Comment dislikeComment(UUID commentId);
	

}
