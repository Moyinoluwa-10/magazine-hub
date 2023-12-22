import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authValue: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.authValue = action.payload;
    },
    logoutUser: (state) => {
      state.authValue = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
