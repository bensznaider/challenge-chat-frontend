"use client";
import { Stack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/thunks/usersThunk";
import { setLoggedUser } from "../state/slices/userSlice";
import { useRouter } from 'next/navigation'

export default function Login() {
  const loggedUser = useSelector((state) => state.loggedUser)
  const dispatch = useDispatch();
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLoginRequest = async () => {
    const user = { name: username, password: password };
    try {
      const response = await dispatch(login(user));
      await dispatch(
        setLoggedUser({ userId: response.data.userId, name: user.name })
      );
      router.push('/')
    } catch (error) {
      console.error("Error during login: ", error);
      setErrorMessage("Incorrect name or password");
      setTimeout(()=>{
        setErrorMessage(null)
      },3000)
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

  return (<div>
    {!loggedUser.userId ? (<div className="pages">
      I AM LOGIN ASHSKJRARKJARLNA
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
        <Button onClick={handleLoginRequest}>LOGIN</Button>
      </Stack>
      {errorMessage && (
        <div style={{ margin: "1rem", fontSize: "large" }}>{errorMessage}</div>
      )}
    </div>) : (<h1 className="pages">YA ESTÁS LOGUEADO CAPO</h1>)}
    </div>
  );
}
