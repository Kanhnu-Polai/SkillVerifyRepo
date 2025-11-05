package com.skillverify.applicationservice.config;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.MessageDeliveryMode;
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

    public static final String EXCHANGE = "applicationExchange";
    public static final String ROUTING_KEY = "application.created"; // ✅ FIXED
    public static final String QUEUE = "applicationQueue";
	 
	 
	 
	 @Bean
	 public TopicExchange exchange() {
	        return new TopicExchange(EXCHANGE,true,false);
	    }

	 
	 @Bean
	 public Queue queue() {
	        return new Queue(QUEUE, true, false, false);
	    }
	 
	 @Bean
	    Binding companyBinding(Queue companyQueue, TopicExchange companyExchange) {
	        return BindingBuilder.bind(companyQueue).to(companyExchange).with(ROUTING_KEY);
	    }

	    @Bean
	    Jackson2JsonMessageConverter messageConverter() {
	        return new Jackson2JsonMessageConverter();
	    }

	    @Bean
	    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
	                                         Jackson2JsonMessageConverter converter) {
	        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
	        rabbitTemplate.setMessageConverter(converter);

	        // ✅ Make messages persistent
	        rabbitTemplate.setBeforePublishPostProcessors(message -> {
	            message.getMessageProperties().setDeliveryMode(MessageDeliveryMode.PERSISTENT);
	            return message;
	        });

	        // ✅ Ensure publisher is notified if message cannot be routed
	        rabbitTemplate.setMandatory(true);

	        // ✅ Log when message cannot be delivered
	        rabbitTemplate.setReturnsCallback(returned -> {
	            System.err.println("⚠️ Message could not be delivered to queue!");
	            System.err.println("Exchange: " + returned.getExchange());
	            System.err.println("Routing Key: " + returned.getRoutingKey());
	            System.err.println("Reply Code: " + returned.getReplyCode());
	            System.err.println("Reply Text: " + returned.getReplyText());
	            System.err.println("Message: " + returned.getMessage());
	        });

	        return rabbitTemplate;
	    }

	    @Bean
	    public AmqpAdmin amqpAdmin(ConnectionFactory connectionFactory) {
	        return new RabbitAdmin(connectionFactory);
	    }
	 
	 
}
