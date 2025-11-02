package com.skillverify.companyservice.messaging;


import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.skillverify.companyservice.dto.CompanyCreatedEvent;

@Component
public class TestConsumer {

    @RabbitListener(queues = "company.queue")
    public void receive(CompanyCreatedEvent event) {
        System.out.println("📩 [RabbitMQ] Received userId: " + event);
    }
}