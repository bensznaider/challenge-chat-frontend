"use client";
import { Stack, Input, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, reloadUser } from "../state/thunks/usersThunk";
import { Spinner } from "@chakra-ui/react";
import { setLoggedUser } from "../state/slices/userSlice";

export default function Signup() {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correctSignUp, setCorrectSignUp] = useState(null);
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

  useEffect(() => {
    if (loggedUser.userId) {
      setTimeout(() => {
        location.replace("/chat");
      }, 3000);
    }
  }, [loggedUser]);

  const handleSignUpRequest = async () => {
    setErrorMessage(null);
    setCorrectSignUp(null);
    const user = { name: username, password: password };
    if (user.name && user.password) {
      try {
        setSpinnerOn(true);
        const response = await dispatch(createUser(user));
        if (response.status === 200) {
          setCorrectSignUp(true);
          setUsername("");
          setPassword("");
          setTimeout(() => {
            setCorrectSignUp(null);
            setSpinnerOn(false);
            location.replace("/");
          }, 3000);
        }
      } catch (error) {
        console.error("Error during signup: ", error);
        setErrorMessage(error.response.data);
        setSpinnerOn(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
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

  return (
    <div
      className="pages"
      style={{
        background: "linear-gradient(to left, black, #002600)",
        paddingLeft: 0,
      }}
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
            {!spinnerOn ? (
              <Button onClick={handleSignUpRequest}>Sign up</Button>
            ) : (
              <Spinner />
            )}
          </Stack>
          {correctSignUp && (
            <div
              style={{ margin: "1rem", fontSize: "large", textAlign: "center" }}
            >
              User succesfully created, you will be redirected to the homepage.
            </div>
          )}
          {errorMessage && (
            <div
              style={{
                margin: "1rem",
                marginRight: "10%",
                marginLeft: "10%",
                fontSize: "large",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </div>
          )}
        </div>
      ) : (
        <Text fontSize="4xl" textAlign="center">
          You are logged in as {loggedUser.name}. We will redirect you to your
          chats.
        </Text>
      )}
    </div>
  );
}
