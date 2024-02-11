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
import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import ChatMessage from "../components/ChatMessage";
import {
  createChat,
  newMessageAndAnswer,
  deleteChat,
} from "../state/thunks/chatsThunk";
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
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [newChat, setNewChat] = useState("");

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleCreateChat = () => {
    if (newChat) {
      dispatch(createChat(newChat, loggedUser.userId));
      setNewChat("");
    }
  };

  const handleDeleteChat = () => {
    if (selectedChat) {
      dispatch(deleteChat(chats[selectedChat].id, loggedUser.userId));
    }
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
      <Bar />
      <div
        className="pages"
        style={{ paddingTop: "1rem", paddingBottom: "22vh" }}
      >
        <HStack>
          <Select
            placeholder="Select chat"
            value={selectedChat}
            onChange={(event) => setSelectedChat(event.target.value)}
          >
            {chats &&
              chats.map((chat, index) => (
                <option key={chat.id} value={index}>
                  {chat.name}
                </option>
              ))}
          </Select>
          <DeleteIcon
            onClick={handleDeleteChat}
            color={selectedChat ? "white" : "grey"}
            style={{ cursor: selectedChat ? "pointer" : "not-allowed" }}
          />
          <VStack>
            <Text>New chat:</Text>
            <Input
              type="name"
              placeholder="Chat name/description."
              value={newChat}
              onChange={(event) => setNewChat(event.target.value)}
            />
            <div className="buttons" onClick={handleCreateChat}>
              Create
            </div>
          </VStack>
        </HStack>
        {chats &&
          selectedChat &&
          chats[selectedChat].messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
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
