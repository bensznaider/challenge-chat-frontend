"use client";
import { Text, Stack, Input, Button, VStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, reloadUser } from "./state/thunks/usersThunk";
import { setLoggedUser } from "./state/slices/userSlice";
import { Spinner } from "@chakra-ui/react";

export default function Home() {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [spinnerOn, setSpinnerOn] = useState(false);

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

  const handleLoginRequest = async () => {
    const user = { name: username, password: password };
    if (user.name && user.password) {
      try {
        setSpinnerOn(true);
        const response = await dispatch(login(user));
        await dispatch(
          setLoggedUser({ userId: response.data.userId, name: user.name })
        );
        setSpinnerOn(false);
        router.push("/chat");
      } catch (error) {
        console.error("Error during login: ", error);
        setErrorMessage("Incorrect name or password");
        setSpinnerOn(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
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

  useEffect(() => {
    if (loggedUser.userId) {
      setTimeout(() => {
        location.replace("/chat");
      }, 3000);
    }
  }, [loggedUser]);

  return (
    <div
      className="pages"
      style={{
        background: "linear-gradient(to left, black, #001500)",
        paddingLeft: 0,
      }}
    >
      {!loggedUser.userId ? (
        <VStack align="center" justify="center">
          <Text fontSize="6xl">Welcome</Text>
          <Text
            fontSize={["lg", "2xl"]}
            w={["90%", "60%"]}
            mb="2rem"
            textAlign="center"
          >
            Challenge Chat is a chat app built with Next.js, Chakra UI and
            Express.js, fed by OpenAI's Chat Completions API. Log in and give it
            a try!
          </Text>
        </VStack>
      ) : (
        <VStack align="center" justify="center">
          <Text fontSize="4xl">Welcome back</Text>
          <Text fontSize="2xl" textAlign="center">
            You are logged in as {loggedUser.name}. We will redirect you to your
            chats.
          </Text>
        </VStack>
      )}
      {!loggedUser.userId && (
        <Stack className="forms" align="center">
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
          {!spinnerOn ? (
            <Button style={{ width: "5rem" }} onClick={handleLoginRequest}>
              Login
            </Button>
          ) : (
            <Spinner />
          )}
          {errorMessage && (
            <div style={{ margin: "1rem", fontSize: "large" }}>
              {errorMessage}
            </div>
          )}
          <Text mt="1.5rem">
            Haven't signed up yet?{" "}
            <Link href="/signup" color="green">
              Click here.
            </Link>
          </Text>
        </Stack>
      )}
    </div>
  );
}
