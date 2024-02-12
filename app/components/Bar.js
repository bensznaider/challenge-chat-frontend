"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/thunks/usersThunk";
import { createChat } from "../state/thunks/chatsThunk";
import { setLoggedUser } from "../state/slices/userSlice";
import {
  Button,
  Box,
  Text,
  Select,
  Input,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { deleteChat } from "../state/thunks/chatsThunk";

export default function Bar({ chats, setSelectedChat, selectedChat }) {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [newChat, setNewChat] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [spinnerCreateChatOn, setSpinnerCreateChatOn] = useState(false);
  const [spinnerDeleteChatOn, setSpinnerDeleteChatOn] = useState(false);

  const handleMenuOpener = () => {
    !isMenuOpen ? setIsMenuOpen(true) : setIsMenuOpen(false);
  };

  const handleCreateChat = async () => {
    if (newChat) {
      try {
        setSpinnerCreateChatOn(true)
        await dispatch(createChat(newChat, loggedUser.userId));
        setNewChat("");
        setSpinnerCreateChatOn(false)
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteChat = async (chatId) => {
    if (selectedChat !== undefined && chats.length > 0) {
      try {
        setSpinnerDeleteChatOn(true);
        await dispatch(deleteChat(chatId, loggedUser.userId));
        setSpinnerDeleteChatOn(false);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogoutRequest = () => {
    dispatch(logout(dispatch));
    location.replace("/");
  };

  return (
    <div className="bar">
      <VStack
        css={{
          "@media screen and (max-width: 550px)": {
            display: "none",
          },
        }}
        className="bar"
      >
        {loggedUser.userId && (
          <Box>
            <Text mb="1.5rem">Challenge Chat 1.0</Text>
            <HStack mb="1.5rem">
              <Text>Hi {loggedUser.name}!</Text>
              <Button
                className="buttons"
                _hover={{ textDecoration: "none" }}
                onClick={handleLogoutRequest}
                bgColor="black"
                color="grey"
              >
                Logout
              </Button>
            </HStack>
          </Box>
        )}
        <Text>New chat:</Text>
        <Input
          type="name"
          placeholder="Chat name/description."
          value={newChat}
          w="95%"
          pl="2"
          onChange={(event) => setNewChat(event.target.value)}
        />
        {!spinnerCreateChatOn ? (
          <div
            className="buttons"
            style={{ marginBottom: "2rem" }}
            onClick={handleCreateChat}
          >
            Create
          </div>
        ) : (
          <Spinner />
        )}

        {chats &&
          chats.map((chat, index) => (
            <HStack w="100%">
              <Text
                className="buttons"
                key={chat.id}
                onClick={() => {
                  setSelectedChat(index);
                }}
                fontSize="small"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                w="95%"
              >
                {chat.name}
              </Text>
              {!spinnerDeleteChatOn ? (
                <DeleteIcon
                  onClick={() => handleDeleteChat(chat.id)}
                  color={selectedChat !== undefined ? "white" : "grey"}
                  style={{
                    cursor:
                      selectedChat !== undefined ? "pointer" : "not-allowed",
                  }}
                />
              ) : (
                <Spinner />
              )}
            </HStack>
          ))}
      </VStack>
      <VStack
        css={{
          "@media screen and (min-width: 551px)": {
            display: "none",
          },
        }}
      >
        <HStack>
          <Text>Challenge Chat 1.0</Text>{" "}
          <HamburgerIcon
            onClick={handleMenuOpener}
            boxSize={6}
            cursor="pointer"
          />
        </HStack>
        {isMenuOpen && (
          <Box>
            {loggedUser.userId && (
              <HStack ml="auto">
                <Text>Hi {loggedUser.name}!</Text>
                <Button
                  className="buttons"
                  _hover={{ textDecoration: "none" }}
                  onClick={handleLogoutRequest}
                  bgColor="black"
                  color="grey"
                >
                  Logout
                </Button>
              </HStack>
            )}
            <HStack w="92vw">
              <Text>New chat:</Text>
              <Input
                type="name"
                placeholder="Chat name/description."
                value={newChat}
                onChange={(event) => setNewChat(event.target.value)}
              />
              {!spinnerCreateChatOn ? (
                <div className="buttons" onClick={handleCreateChat}>
                  Create
                </div>
              ) : (
                <Spinner />
              )}
            </HStack>
            <HStack w="92vw">
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
              {!spinnerDeleteChatOn ? (
                <DeleteIcon
                  onClick={() => handleDeleteChat(chats[selectedChat].id)}
                  color={selectedChat ? "white" : "grey"}
                  style={{ cursor: selectedChat ? "pointer" : "not-allowed" }}
                />
              ) : (
                <Spinner />
              )}
            </HStack>
          </Box>
        )}
      </VStack>
    </div>
  );
}
