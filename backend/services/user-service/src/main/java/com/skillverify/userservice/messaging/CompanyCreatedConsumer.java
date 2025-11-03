package com.skillverify.userservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.skillverify.userservice.dto.CompanyCreatedEvent;
import com.skillverify.userservice.entity.UserData;
import com.skillverify.userservice.repository.UserDataRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CompanyCreatedConsumer {
	
	
	private final UserDataRepository userDataRepository;
	
	@RabbitListener(queues = "company.queue")
	public void receiveMessage(CompanyCreatedEvent message) {
		log.info("Received Company Created Message: {}", message);
		
		UserData existingUser = userDataRepository.findById(message.getUserId()).orElseThrow(
				() -> new RuntimeException("User not found with ID: " + message.getUserId()));
		
		if(existingUser == null) {
			log.warn("User with ID {} not found. Cannot associate company ID {}", message.getUserId(), message.getCompanyId());
			return;
		}
		userDataRepository.findById(message.getUserId()).ifPresent(user -> {
			user.getCompanyIds().add(message.getCompanyId());
			userDataRepository.save(user);
			log.info("Updated user {} with new company ID {}", user.getId(), message.getCompanyId());
		});
		log.info("Finished processing Company Created Message for user ID: {}", message.getUserId());
	}

}
