import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "loggedUser",
  initialState: { userId: null, name: null },
  reducers: {
    setLoggedUser: (state, action) => {
      const { userId, name } = action.payload;
      return { ...state, userId, name };
    },
  },
});
export const { setLoggedUser } = userSlice.actions;
export default userSlice.reducer;
