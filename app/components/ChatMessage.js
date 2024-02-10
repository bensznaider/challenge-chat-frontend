"use client";

export default function ChatMessage({ message }) {
  return (
    <div className={message.isMessageFromUser ? "user-message" : "bot-message"}>
      {message.message}
    </div>
  );
}
