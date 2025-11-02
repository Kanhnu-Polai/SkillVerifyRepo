package com.skillverify.companyservice.config;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
	
	public static final String EXCHANGE_NAME = "company.exchange";
	public static final String ROUTING_KEY = "company.routingkey";
	public static final String QUEUE_NAME = "company.queue";
	
	
	@Bean
	 TopicExchange companyExchange() {
		return new TopicExchange(EXCHANGE_NAME);
	}
	
	@Bean
	Queue companyQueue() {
		return new Queue(QUEUE_NAME);
	}
	
	@Bean
	Jackson2JsonMessageConverter messageConverter() {
		return new Jackson2JsonMessageConverter();
	}
	
	@Bean
	Binding companyBinding(Queue companyQueue, TopicExchange companyExchange) {
		return BindingBuilder
				.bind(companyQueue)
				.to(companyExchange)
				.with(ROUTING_KEY);
	}
	
	// ✅ RabbitTemplate that uses JSON converter
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
                                         Jackson2JsonMessageConverter converter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter);
        return rabbitTemplate;
    }
	
	
	 @Bean
	    public AmqpAdmin amqpAdmin(ConnectionFactory connectionFactory) {
	        return new RabbitAdmin(connectionFactory);
	    }
	
	
	

}
