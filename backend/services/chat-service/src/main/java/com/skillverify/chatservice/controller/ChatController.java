package com.skillverify.chatservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import com.skillverify.chatservice.model.Message;
import com.skillverify.chatservice.model.TypingStatus;
import com.skillverify.chatservice.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/send")
    @SendTo("/topic/public")
    public Message sendMessage(Message message) {
        return chatService.saveMessage(message);
    }

    @MessageMapping("/typing")
    @SendTo("/topic/typing")
    public TypingStatus sendTypingStatus(TypingStatus status) {
        return status;
    }

    @GetMapping("/history")
    public List<Message> getChatHistory(@RequestParam Long user1, @RequestParam Long user2) {
        return chatService.getMessageHistory(user1, user2);
    }

    @PostMapping("/status")
    public void updateMessageStatus(@RequestParam String messageId, @RequestParam String status) {
        chatService.updateMessageStatus(messageId, status);
    }
}