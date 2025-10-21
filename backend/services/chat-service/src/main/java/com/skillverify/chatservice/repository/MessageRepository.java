package com.skillverify.chatservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillverify.chatservice.model.Message;

public interface MessageRepository extends MongoRepository<Message, String> {
	
	List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderByTimestampAsc(
            Long senderId1, Long receiverId1, Long senderId2, Long receiverId2
    );
}
