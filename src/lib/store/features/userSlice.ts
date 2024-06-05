"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AuthData } from "@/utils/types";

const initialState: AuthData = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        id: action.payload._id,
        email: action.payload.email,
        name: action.payload.name,
        phone: action.payload.phone,
        profilePicture: action.payload.profilePicture,
        role: action.payload.role,
        token: action.payload.token,
      };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
