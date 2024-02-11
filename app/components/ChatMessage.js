"use client";
import { Text } from "@chakra-ui/react";

export default function ChatMessage({ message }) {
  return (
    <Text
      className={`messages ${message.isMessageFromUser ? "user-message" : "bot-message"}`}
    >
      {message.message}
    </Text>
  );
}
