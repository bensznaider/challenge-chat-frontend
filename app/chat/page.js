"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HStack, Text, Textarea } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import ChatMessage from "../components/ChatMessage";
import {
  getChatsByUser,
  newMessageAndAnswer,
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
  const [temporaryMessageDisplayed, setTemporaryMessageDisplayed] =
    useState(null);
  const [selectedChat, setSelectedChat] = useState(0);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage) {
      try {
        await setTemporaryMessageDisplayed({
          isMessageFromUser: true,
          message: newMessage,
        });
        document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
        setNewMessage("");
        const response = await dispatch(
          newMessageAndAnswer(
            newMessage,
            loggedUser.userId,
            chats[selectedChat].id
          )
        );
        if (response.status === 201) {
          await dispatch(getChatsByUser(loggedUser.userId));
          setTemporaryMessageDisplayed(null);
        }
        document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } catch (error) {
        console.log(error);
      }
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
        <div id="temporary-message">
          {temporaryMessageDisplayed && (
            <ChatMessage message={temporaryMessageDisplayed} />
          )}
        </div>
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
