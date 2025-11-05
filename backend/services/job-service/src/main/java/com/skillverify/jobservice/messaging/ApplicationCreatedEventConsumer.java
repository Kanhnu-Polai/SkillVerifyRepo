package com.skillverify.jobservice.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.skillverify.jobservice.dto.ApplicationCreatedEvent;
import com.skillverify.jobservice.entity.Job;
import com.skillverify.jobservice.service.JobService;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Data
@RequiredArgsConstructor
@Component
@Slf4j
public class ApplicationCreatedEventConsumer {
	
	private final JobService jobService;

    @RabbitListener(queues = "applicationQueue.job-service")
    public void consumeApplicationCreatedEvent(ApplicationCreatedEvent event) {
        log.info("✅ Received Application Created Event: {}", event);
//     Job job =    jobService.updateNumberCandidateApply(event.getJobId());
     Job job =    jobService.updateNumberCandidateApply(event.getJobId());
     
     if (job == null) {
		 log.error("❌ Updation failed for JobId: {}", event.getJobId());
		 return;
	 }
     log.info("✅ Updated Job after application: {}", event.getJobId());
        
        
    }

}
