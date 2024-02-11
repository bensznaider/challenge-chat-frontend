import axios from "axios";
import { setChats } from "../slices/chatsSlice";

axios.defaults.withCredentials = true;

const server = "http://localhost:8080/api";
//const server = "https://challenge-chat-backend.onrender.com/api"

export const getChatsByUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${server}/chats/all-chats/${userId}/`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch(setChats(response.data));
    return response;
  } catch (err) {
    throw err;
  }
};

export const newMessageAndAnswer =
  (newMessage, userId, chatId) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${server}/chats/add-message`,
        {
          userId: userId,
          isMessageFromUser: true,
          message: newMessage,
          chatId: chatId,
        },
        { withCredentials: true, credentials: "include" }
      );
      dispatch(getChatsByUser(userId));
      return response;
    } catch (err) {
      throw err;
    }
  };

export const createChat = (chatName, userId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${server}/chats/create-chat`,
      {
        userId: userId,
        name: chatName,
      },
      { withCredentials: true, credentials: "include" }
    );
    dispatch(getChatsByUser(userId));
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteChat = (chatId, userId) => async () => {
  console.log("entró al deletechat", chatId, userId);
  try {
    const response = await axios.delete(
      `${server}/chats/delete-chat`,
      { data: { id: chatId, userId: userId } },
      { withCredentials: true, credentials: "include" }
    );
    return response;
  } catch (err) {
    throw err;
  }
};
