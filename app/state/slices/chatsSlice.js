import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: [],
  reducers: {
    setChats: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChats } = chatsSlice.actions;
export default chatsSlice.reducer;
