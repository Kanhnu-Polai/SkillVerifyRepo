package com.skillverify.companyservice.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.skillverify.companyservice.dto.CompanyCreatedEvent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CompanyEventProducer {
	
	
	private final RabbitTemplate rabbitTemplate;
	
	@Value("${spring.rabbitmq.template.exchange}")
	private String exchange;
	
	@Value("${spring.rabbitmq.template.routing-key}")
    private String routingKey;


    public void sendCompanyCreatedMessage(CompanyCreatedEvent event) {
        log.info("📤 Sending company created message for userId: {}", event);
        rabbitTemplate.convertAndSend(exchange, routingKey, event);
    }
	

}
