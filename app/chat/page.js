"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HStack, Text, Textarea } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import ChatMessage from "../components/ChatMessage";
import { newMessageAndAnswer } from "../state/thunks/chatsThunk";

export default function Chat() {
  const dispatch = useDispatch();
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
      setNewMessage("");
      dispatch(newMessageAndAnswer(newMessage, loggedUser.userId));
    } else {
      console.log("NO HAY MENSAJE CAPO");
    }
  };

  return (
    <div className="pages" style={{ paddingBottom: "22vh" }}>
      CHAT!!!!!
      {chats &&
        chats.map((chat) => <ChatMessage key={chat.id} message={chat} />)}
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
