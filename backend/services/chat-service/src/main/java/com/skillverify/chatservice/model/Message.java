package com.skillverify.chatservice.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "messages")
public class Message {
	
	@Id
    private String id;
    private Long senderId;
    private Long receiverId;
    private String content;
    private String type; // TEXT, IMAGE, FILE
    private String fileUrl;
    private LocalDateTime timestamp;
    private String status; //

}
