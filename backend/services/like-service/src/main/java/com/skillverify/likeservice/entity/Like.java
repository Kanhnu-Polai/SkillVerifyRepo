package com.skillverify.likeservice.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "likes")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Like {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long likeId;
	
	
	private Long userId;
	private UUID postId;
	private Boolean isLiked;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

}
