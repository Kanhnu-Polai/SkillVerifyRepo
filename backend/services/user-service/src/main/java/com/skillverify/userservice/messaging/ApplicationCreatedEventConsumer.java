package com.skillverify.userservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.skillverify.userservice.dto.ApplicationCreatedEvent;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@RequiredArgsConstructor
@Component
@Slf4j
public class ApplicationCreatedEventConsumer {
	
	
	 @RabbitListener(queues = "applicationQueue.user-service")
	public void consumeApplicationCreatedEvent(ApplicationCreatedEvent event) {
		log.info("Received Application Created Event: {}", event);
		
	}

}
