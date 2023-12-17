import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keHoachDieuTri: {
    idBenhNhan: null,
    chanDoan: "",
    noiDung: "",
  },
};

export const treatmentPlanSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setKeHoachDieuTri: (state, { payload }) => {
      state.keHoachDieuTri = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setKeHoachDieuTri } = treatmentPlanSlice.actions;

export default treatmentPlanSlice.reducer;
