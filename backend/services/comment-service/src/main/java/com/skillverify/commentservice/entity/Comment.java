package com.skillverify.commentservice.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Node("Comment")
@Data
@AllArgsConstructor
@NoArgsConstructor   // ✅ required for SDN
@Builder
public class Comment {

    @Id
    @GeneratedValue
    private UUID id;

    private UUID postId;

    private Long userId;
    private String userName;
    private String photoUrl;

    private String content;
    private Long createdAt;
    private int likesCount;
    private int dislikesCount;

    @Builder.Default
    @Relationship(type = "REPLIED_TO", direction = Relationship.Direction.OUTGOING)
    private List<Comment> replies = new ArrayList<>();  // ✅ initialized safely
}