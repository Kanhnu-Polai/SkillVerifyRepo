package com.skillverify.chatservice.model;

import lombok.Data;

@Data
public class TypingStatus {
	
	private Long senderId;
	private Long receiverId;
	private boolean isTyping;
}
