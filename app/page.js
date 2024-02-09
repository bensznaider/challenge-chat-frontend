"use client";
import { Link } from "@chakra-ui/next-js";
import { useSelector } from "react-redux";

export default function Home() {
  const loggedUser = useSelector((state) => state.loggedUser);

  return (
    <div className="pages">
      WELCOME
      {!loggedUser.name ? ( <Link href="/signup" color="blue.400" _hover={{ color: "blue.500" }}>
        Get started
      </Link>) : ( <Link href="/chat" color="blue.400" _hover={{ color: "blue.500" }}>
        Go to chats.
      </Link>)}
     
      <div>{loggedUser.name}</div>
    </div>
  );
}
