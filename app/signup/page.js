"use client";
import { Stack, Input, Button } from "@chakra-ui/react";
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

  const handleSignUpRequest = async (event) => {
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
        }, 2000);
      }
    } catch (error) {
      console.error("Error during signup: ", error);
      setErrorMessage(error.response.data);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      document.getElementById("result-message").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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
    <div>
      {!loggedUser.userId ? (
        <div className="pages">
          WELCOME TO SIGN UP PAGE, WHERE YOU CAN SIGN UP TO THIS SHITTY CHAT
          THAT IS DRIVING ME CRAZY BECAUSE I HAVE NEVER USED NEXT AND MY
          ECONOMIC FUTURE RELIES ON IT
          <Stack
            className="forms"
            style={{
              margin: "auto",
            }}
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
            <Button onClick={handleSignUpRequest}>SIGN UP</Button>
          </Stack>
          {correctSignUp && (
            <div style={{ margin: "1rem", fontSize: "large" }}>
              User succesfully created, please log in.
            </div>
          )}
          {errorMessage && (
            <div style={{ margin: "1rem", fontSize: "large" }}>
              {errorMessage}
            </div>
          )}
        </div>
      ) : (
        <h1 className="pages">YA ESTÁS LOGUEADO MOSTRO</h1>
      )}
    </div>
  );
}
