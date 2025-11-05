package com.skillverify.userservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CompanyRabbitMQConfig {

    // === Company Queue Config ===
    public static final String COMPANY_EXCHANGE = "company.exchange";
    public static final String COMPANY_ROUTING_KEY = "company.routingkey";
    public static final String COMPANY_QUEUE = "company.queue"; // ✅ Make this specific to user-service

    // === JSON Message Converter ===
    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // === Queue, Exchange, Binding Beans ===
    @Bean
    public Queue companyQueue() {
        return new Queue(COMPANY_QUEUE, true);
    }

    @Bean
    public TopicExchange companyExchange() {
        return new TopicExchange(COMPANY_EXCHANGE);
    }

    @Bean
    public Binding companyBinding() {
        return BindingBuilder
                .bind(companyQueue())
                .to(companyExchange())
                .with(COMPANY_ROUTING_KEY);
    }
}