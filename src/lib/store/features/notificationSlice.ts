import { User } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

type ChatData = {
  user: string | null;
  newMessage: string | null;
};

const initialState: ChatData[] = [];
// {
//   user: null,
//   newMessage: null,
// };

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state) => {
      state = [];
    },
  },
});

export const { addNotification, removeNotification } = notification.actions;

export default notification.reducer;
