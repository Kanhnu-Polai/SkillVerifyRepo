package com.skillverify.jobservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.support.converter.DefaultClassMapper;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationRabbitMQConfig {


    public static final String EXCHANGE = "applicationExchange";
    public static final String ROUTING_KEY = "application.created";
    public static final String QUEUE = "applicationQueue.job-service";
    @Bean
    public Queue applicationQueue() {
        return new Queue(QUEUE, true);
    }
    
    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public TopicExchange applicationExchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Binding applicationBinding(Queue applicationQueue, TopicExchange applicationExchange) {
        return BindingBuilder.bind(applicationQueue).to(applicationExchange).with(ROUTING_KEY);
    }
    

    
}


