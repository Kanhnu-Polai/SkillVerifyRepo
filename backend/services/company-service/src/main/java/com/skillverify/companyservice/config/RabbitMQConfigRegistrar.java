package com.skillverify.companyservice.config;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class RabbitMQConfigRegistrar {

    private final AmqpAdmin amqpAdmin;

    @PostConstruct
    public void setup() {
        System.out.println("🚀 Declaring exchange, queue, and binding...");
        amqpAdmin.initialize(); // force declare all beans on startup
    }
}