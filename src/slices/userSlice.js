import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthorized: localStorage.getItem('isAuthorized') ? JSON.parse(localStorage.getItem('isAuthorized')) : false,
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthorized = true;
      localStorage.setItem('isAuthorized', true)
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthorized = false;
      localStorage.setItem('isAuthorized', false)
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setLoading } = userSlice.actions;
