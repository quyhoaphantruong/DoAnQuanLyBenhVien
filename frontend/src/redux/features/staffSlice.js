import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dsNhanVien: [],
};

export const staffSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDsBachNhan: (state, { payload }) => {
      state.dsNhanVien = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDsBachNhan } = staffSlice.actions;

export default staffSlice.reducer;
