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

// Action creators are generated for each case reducer function
export const { signup, setUser } = counterSlice.actions;

export default counterSlice.reducer;
