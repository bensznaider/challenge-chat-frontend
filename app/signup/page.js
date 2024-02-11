"use client";
import { Stack, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../state/thunks/usersThunk";

export default function Signup() {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correctSignUp, setCorrectSignUp] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUpRequest = async () => {
    setErrorMessage(null);
    setCorrectSignUp(null);
    const user = { name: username, password: password };
    try {
      const response = await dispatch(createUser(user));
      if (response.status === 200) {
        setCorrectSignUp(true);
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setCorrectSignUp(null);
          location.replace("/")
        }, 3000);
      }
    } catch (error) {
      console.error("Error during signup: ", error);
      setErrorMessage(error.response.data);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  const handleOnChangeUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <div
      className="pages"
      style={{ background: "linear-gradient(to left, black, #001500)" }}
    >
      {!loggedUser.userId ? (
        <div>
          <Text fontSize="2xl" textAlign="center">
            Sign up on Challenge Chat
          </Text>
          <Text fontSize="sm" mt="0.5rem" mb="1.5rem" textAlign="center">
            Enter your user name and password.
          </Text>
          <Stack
            className="forms"
            style={{
              margin: "auto",
              width: "15rem",
            }}
            align="center"
          >
            <Input
              className=""
              type="text"
              value={username}
              onChange={handleOnChangeUsername}
              placeholder="User name"
              style={{ marginBottom: "1.5rem" }}
            />
            <Input
              className=""
              type="password"
              value={password}
              onChange={handleOnChangePassword}
              placeholder="Password"
              style={{
                marginBottom: "1.5rem",
              }}
            />
            <Button onClick={handleSignUpRequest}>Sign up</Button>
          </Stack>
          {correctSignUp && (
            <div style={{ margin: "1rem", fontSize: "large" }}>
              User succesfully created, you will be redirected to the homepage.
            </div>
          )}
          {errorMessage && (
            <div style={{ margin: "1rem", fontSize: "large" }}>
              {errorMessage}
            </div>
          )}
        </div>
      ) : (
        <Text fontSize="4xl">
          You are already logged in as {loggedUser.name}. We will redirect you
          to your chats.
        </Text>
      )}
    </div>
  );
}
