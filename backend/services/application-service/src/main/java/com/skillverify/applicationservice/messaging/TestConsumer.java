package com.skillverify.applicationservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.skillverify.applicationservice.messaging.event.ApplicationCreatedEvent;


@Component
public class TestConsumer {
	
	 @RabbitListener(queues = "applicationQueue")
	    public void receive(ApplicationCreatedEvent event) {
	        System.out.println("📩 [RabbitMQ] Received userId: " + event);
	    }

}
