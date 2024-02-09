"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { HStack, Text, Textarea } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

export default function Chat() {
  const loggedUser = useSelector((state) => {
    return state.loggedUser;
  });
  const chats = useSelector((state) => {
    return state.chats;
  });
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage) {
      console.log("OK EL ENVÍO DE MENSAJE:", newMessage);
    } else {
      console.log("NO HAY MENSAJE CAPO");
    }
  };

  return (
    <div className="pages">
      CHAT!!!!!
      {chats && chats.map((chat) => <p key={chat.id}>{chat.message}</p>)}
      <div className="new-message-bar">
        <Text mb="8px">Message:</Text>
        <HStack>
          <Textarea
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message here"
            resize="none"
            w="72%"
            ml="10%"
            mr="10%"
          />
          <ChatIcon onClick={handleSendMessage} />
        </HStack>
      </div>
    </div>
  );
}
