import { createSlice } from "@reduxjs/toolkit";
// import { logout } from "d:/BowerBird-website/backend/controllers/user.controller";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    userInput: {},
    user: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      const { user, token, expiresAt } = action.payload;
      state.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt");
    },
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
});
export const { setLoading, setUser, setUserInput } = authSlice.actions;
export default authSlice.reducer;
