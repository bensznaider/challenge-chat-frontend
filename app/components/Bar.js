"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadUser, logout } from "../state/thunks/usersThunk";
import { createChat } from "../state/thunks/chatsThunk";
import { setLoggedUser } from "../state/slices/userSlice";
import { Button, Text, Select, Input, HStack, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { extendTheme } from "@chakra-ui/react";
import { deleteChat } from "../state/thunks/chatsThunk";

const breakpoints = {
  base: "0px",
  md: "550px",
};

const theme = extendTheme({ breakpoints });

export default function Bar({ chats, setSelectedChat, selectedChat }) {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [newChat, setNewChat] = useState("");

  useEffect(() => {
    const userPersistence = async () => {
      try {
        const response = await dispatch(reloadUser());
        dispatch(
          setLoggedUser({ userId: response.data.id, name: response.data.name })
        );
      } catch (error) {
        console.log(error);
      }
    };
    userPersistence();
  }, []);

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
      >
        {loggedUser.userId && (
          <HStack mb="1rem">
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
        <Text>New chat:</Text>
        <Input
          type="name"
          placeholder="Chat name/description."
          value={newChat}
          w="95%"
          pl="2"
          onChange={(event) => setNewChat(event.target.value)}
        />
        <div
          className="buttons"
          style={{ marginBottom: "1rem" }}
          onClick={handleCreateChat}
        >
          Create
        </div>
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
              >
                {chat.name}
              </Text>
              <DeleteIcon
                onClick={handleDeleteChat}
                color={selectedChat !== undefined ? "white" : "grey"}
                style={{
                  cursor:
                    selectedChat !== undefined ? "pointer" : "not-allowed",
                }}
              />
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
          <div className="buttons" onClick={handleCreateChat}>
            Create
          </div>
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
          <DeleteIcon
            onClick={handleDeleteChat}
            color={selectedChat ? "white" : "grey"}
            style={{ cursor: selectedChat ? "pointer" : "not-allowed" }}
          />
        </HStack>
      </VStack>
    </div>
  );
}
