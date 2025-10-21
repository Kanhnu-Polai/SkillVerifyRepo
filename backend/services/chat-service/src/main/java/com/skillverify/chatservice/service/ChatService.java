package com.skillverify.chatservice.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillverify.chatservice.model.Message;
import com.skillverify.chatservice.repository.MessageRepository;

@Service
public class ChatService {
	
	@Autowired
	private  MessageRepository messageRepository;
	
	
	 public Message saveMessage(Message message) {
	        message.setTimestamp(LocalDateTime.now());
	        message.setStatus("SENT");
	        return messageRepository.save(message);
	    }
	 
	 public List<Message> getMessageHistory(Long user1, Long user2) {
	        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
	                user1, user2, user1, user2
	        );
	    }

	    public void updateMessageStatus(String messageId, String status) {
	        Message msg = messageRepository.findById(messageId).orElseThrow();
	        msg.setStatus(status);
	        messageRepository.save(msg);
	    }

}
