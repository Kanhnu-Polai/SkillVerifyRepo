package com.skillverify.userservice.messaging;

import java.util.Optional;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.skillverify.userservice.dto.CompanyCreatedEvent;
import com.skillverify.userservice.entity.UserData;
import com.skillverify.userservice.repository.UserDataRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class CompanyCreatedConsumer {

    private final UserDataRepository userDataRepository;

    @RabbitListener(queues = "company.queue") // ✅ Must match the queue name from config
    public void receiveMessage(CompanyCreatedEvent message) {
        log.info("📩 [User-Service] Received Company Created Message: {}", message);

        // ✅ Find the user
        Optional<UserData> existingUser = userDataRepository.findById(message.getUserId());

        // ❌ You cannot compare Optional with null
        if (existingUser.isEmpty()) {
            log.warn("⚠️ User with ID {} not found. Cannot associate company ID {}", 
                     message.getUserId(), message.getCompanyId());
            return;
        }

        // ✅ Safely update the user's company list
        existingUser.ifPresent(user -> {
            if (user.getCompanyIds() == null) {
                user.setCompanyIds(new java.util.ArrayList<>());
            }

            user.getCompanyIds().add(message.getCompanyId());
            userDataRepository.save(user);
            log.info("✅ Updated user {} with new company ID {}", user.getId(), message.getCompanyId());
        });

        log.info("🎯 Finished processing Company Created Message for user ID: {}", message.getUserId());
    }
}