import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dentistSelected: null,
};

export const dentistSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setDentistSelected: (state, { payload }) => {
      state.dentistSelected = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDentistSelected } = dentistSlice.actions;

export default dentistSlice.reducer;
