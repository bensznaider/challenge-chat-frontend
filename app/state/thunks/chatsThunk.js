import axios from "axios";
import { setChats } from "../slices/chatsSlice";

axios.defaults.withCredentials = true;

const server = "http://localhost:8080/api"

export const getChatsByUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${server}/chats/all-messages/${userId}/`,
      { withCredentials: true, credentials: 'include' }
    );
    dispatch(setChats(response.data));
    return response;
  } catch (err) {
    throw err;
  }
};

export const newMessageAndAnswer = (newMessage, userId) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${server}/chats/add-message`,
      {
        userId: userId,
        isMessageFromUser: true,
        message: newMessage,
      },
      { withCredentials: true, credentials: 'include' }
    );
    dispatch(getChatsByUser(userId));
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteChats = (movieData) => async () => {
  const { tmdbId, userId } = movieData;
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER}/favorites/remove-favorite`,
      { data: { userId: userId, tmdbId: tmdbId } },
      { withCredentials: true, credentials: 'include' }
    );
    return response;
  } catch (err) {
    throw err;
  }
};
