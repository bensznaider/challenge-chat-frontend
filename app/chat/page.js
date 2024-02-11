"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HStack,
  VStack,
  Input,
  Text,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import ChatMessage from "../components/ChatMessage";
import { newMessageAndAnswer } from "../state/thunks/chatsThunk";
import Bar from "../components/Bar";

export default function Chat() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => {
    return state.loggedUser;
  });
  const chats = useSelector((state) => {
    return state.chats;
  });
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(0);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage) {
      dispatch(
        newMessageAndAnswer(
          newMessage,
          loggedUser.userId,
          chats[selectedChat].id
        )
      );
      setNewMessage("");
    }
  };

  return (
    <div>
      <Bar
        setSelectedChat={setSelectedChat}
        chats={chats}
        selectedChat={selectedChat}
      />
      <div
        className="pages"
        style={{ paddingTop: "1rem", paddingBottom: "22vh" }}
      >
        {chats.length === 0 && (
          <Text fontSize={["lg", "2xl"]} textAlign="center">
            Create a new chat to get started.
          </Text>
        )}
        {chats &&
          chats[selectedChat] !== undefined &&
          chats[selectedChat].messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        <div className="new-message-bar">
          <Text mb="8px">Message:</Text>
          <HStack justify="center">
            <Textarea
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type your message here"
              resize="none"
              w="80%"
              mr="0.5rem"
              style={{
                cursor: chats.length === 0 && "not-allowed",
              }}
            />
            <ChatIcon
              onClick={handleSendMessage}
              style={{ cursor: "pointer" }}
            />
          </HStack>
        </div>
      </div>
    </div>
  );
}
