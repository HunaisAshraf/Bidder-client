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
    setUser: (state, auction) => {
      state.user = {
        _id: auction.payload._id,
        email: auction.payload.email,
        name: auction.payload.name,
        phone: auction.payload.phone,
        profilePicture: auction.payload.profilePicture,
        role: auction.payload.role,
        token: auction.payload.token,
        isVerified: auction.payload.isVerified,
        isActive: auction.payload.isActive,
      };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
