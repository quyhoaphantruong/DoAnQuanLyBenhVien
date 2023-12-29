import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  benhNhanSelected: null,
  idBenhNhan: null,
};

export const staffSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setBenhNhanSelected: (state, { payload }) => {
      state.benhNhanSelected = payload;
    },
    setIdBenhNhan: (state, { payload }) => {
      state.idBenhNhan = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBenhNhanSelected, setIdBenhNhan } = staffSlice.actions;

export default staffSlice.reducer;
