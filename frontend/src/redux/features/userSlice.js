import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setUser } = counterSlice.actions;

export default counterSlice.reducer;
