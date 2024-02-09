"use client";
import { Link } from "@chakra-ui/next-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadUser, logout } from "../state/thunks/usersThunk";
import { setLoggedUser } from "../state/slices/userSlice";
import { Button, Stack } from "@chakra-ui/react";

export default function Bar() {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

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

  const handleLogoutRequest = () => {
    dispatch(logout(dispatch));
  };

  return (
    <div className="bar">
      <Link href="/" _hover={{ textDecoration: "none" }}>
        Challenge Chat
      </Link>
      <div className="bar-buttons-wrapper">
        {!loggedUser.userId ? (
          <Stack>
            {" "}
            <Link
              href="/signup"
              className="buttons"
              _hover={{ textDecoration: "none" }}
            >
              Signup
            </Link>
            <Link
              href="/login"
              className="buttons"
              _hover={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </Stack>
        ) : (
          <Button
            className="buttons"
            _hover={{ textDecoration: "none" }}
            onClick={handleLogoutRequest}
          >
            Logout
          </Button>
        )}

        <div>{loggedUser.name}</div>
      </div>
    </div>
  );
}
