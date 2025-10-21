import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

const Chat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const senderId = 101;
  const receiverId = 202;

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:9094/ws-chat", // native WebSocket
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        setConnected(true);

        client.subscribe("/topic/public", (msg) => {
          const body = JSON.parse(msg.body);
          setMessages((prev) => [...prev, body]);
        });

        client.subscribe("/topic/typing", (msg) => {
          const typingData = JSON.parse(msg.body);
          console.log("⌨️ Typing:", typingData);
        });
      },
      onStompError: (frame) =>
        console.error("❌ STOMP Error:", frame.headers["message"]),
      onWebSocketError: (err) => console.error("❌ WebSocket Error:", err),
    });

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, []);

  const sendMessage = () => {
    if (stompClient && connected && message.trim() !== "") {
      const payload = {
        senderId,
        receiverId,
        content: message,
        type: "TEXT",
        timestamp: new Date(),
      };
      stompClient.publish({
        destination: "/app/send",
        body: JSON.stringify(payload),
      });
      setMessages((prev) => [...prev, { ...payload, self: true }]);
      setMessage("");
    }
  };

  const sendTyping = () => {
    if (stompClient && connected) {
      const typingPayload = { senderId, receiverId, isTyping: true };
      stompClient.publish({
        destination: "/app/typing",
        body: JSON.stringify(typingPayload),
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">💬 Chat Test</h2>
      <div className="border p-2 h-64 overflow-y-auto w-full max-w-md mb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.self ? "text-right bg-green-200 p-1 rounded mb-1" : "text-left bg-blue-100 p-1 rounded mb-1"}
          >
            <strong>{msg.self ? "You" : `User ${msg.senderId}`}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>
      <input
        className="border p-1 w-full max-w-md"
        value={message}
        placeholder="Type a message"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={sendTyping}
      />
      <button
        className="bg-green-500 text-white p-2 mt-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
      <div>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</div>
    </div>
  );
};

export default Chat;