import { User } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

type ChatData = {
  selectedChat: string | null;
  user: User | null;
};

const initialState: ChatData = {
  selectedChat: null,
  user: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setChatUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { selectChat, setChatUser } = chatSlice.actions;

export default chatSlice.reducer;
