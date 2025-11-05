package com.skillverify.applicationservice.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.skillverify.applicationservice.messaging.event.ApplicationCreatedEvent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApplicationEventProducer {
	
	private final RabbitTemplate rabbitTemplate;
	
	@Value("${rabbitmq.exchange}")
	private String exchange;
	
	@Value("${rabbitmq.routingkey}")
	private String routingKey ;
	
	
	
	public void sendApplicationCreatedEvent(ApplicationCreatedEvent event) {
		log.info("📤 Sending application created event: {}", event);
		rabbitTemplate.convertAndSend(exchange, routingKey, event);
	}
	
	
	

}
