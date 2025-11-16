package com.skillverify.postservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID postId;

    private Long userId;  // Reference to User Service
    private String userName; // Store user name for quick access
    private String userPhotoUrl; // Store user photo URL for quick access
    private String userRole; // Store user role for quick access

    private String title;

    @ElementCollection
    private List<String> hashTags;

    @Column(length = 5000) 
    private String description;

    private String imageUrl;

    @ElementCollection
    private List<String> category;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private boolean isActive = true;

    // Engagement counts
    private Long likeCount = 0L;
    private Long shareCount = 0L;
    private Long saveCount = 0L;
    private Long commentCount = 0L;

    // Moderation
    private String status = "DRAFT";  // DRAFT, PUBLISHED, ARCHIVED
    private boolean isPinned = false;

    
}