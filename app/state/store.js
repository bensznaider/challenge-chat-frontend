import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./slices/chatsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    loggedUser: userReducer,
    chats: chatsReducer,
  },
});

export default store;
