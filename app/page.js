"use client";
import { Link } from "@chakra-ui/next-js";
import { useSelector } from "react-redux";

export default function Home() {
  const loggedUser = useSelector((state) => state.loggedUser);

  return (
    <div className="pages">
      WELCOME
      <Link href="/signup" color="blue.400" _hover={{ color: "blue.500" }}>
        Get started
      </Link>
      <div>{loggedUser.name}</div>
    </div>
  );
}
