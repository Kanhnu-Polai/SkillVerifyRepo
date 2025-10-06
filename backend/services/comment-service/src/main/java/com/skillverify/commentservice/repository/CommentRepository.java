package com.skillverify.commentservice.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.skillverify.commentservice.entity.Comment;
@Repository
public interface CommentRepository extends Neo4jRepository<Comment,UUID> {
	
	 List<Comment> findByPostId(UUID postId);	

}
