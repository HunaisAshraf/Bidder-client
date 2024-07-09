import { AdminAuthData } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminAuthData = {
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, auction) => {
      state.admin = {
        _id: auction.payload._id,
        email: auction.payload.email,
        name: auction.payload.name,
        phone: auction.payload.phone,
        profilePicture: auction.payload.profilePicture,
        role: auction.payload.role,
        token: auction.payload.token,
        isActive: auction.payload.isActive,
      };
    },
    adminLogout: (state) => {
      state.admin = null;
      localStorage.removeItem("admin-auth");
      localStorage.removeItem("admin-token");
    },
  },
});

export const { setAdmin, adminLogout } = adminSlice.actions;

export default adminSlice.reducer;
