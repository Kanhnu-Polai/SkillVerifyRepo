package com.skillverify.userservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationRabbitMQConfig {

	 public static final String EXCHANGE = "applicationExchange";
	    public static final String ROUTING_KEY = "application.created"; // ✅ SAME
	    public static final String QUEUE = "applicationQueue.user-service";

    @Bean
    public Queue applicationQueue() {
        return new Queue(QUEUE, true);
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


