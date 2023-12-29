import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dsNhanVien: [],
  dsNhanVienBanDau: [],
  locLoaiNhanVien: "Tất cả",
};

export const staffSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDsNhanVien: (state, { payload }) => {
      state.dsNhanVien = payload;
    },
    setDsNhanVienBanDau: (state, { payload }) => {
      state.dsNhanVienBanDau = payload;
    },

    setLocLoaiNhanVien: (state, { payload }) => {
      state.locLoaiNhanVien = payload;
    },
    filterDsNhanVien: (state, { payload }) => {
      state.dsNhanVien = state.dsNhanVienBanDau.filter(
        (nhanVien) => nhanVien.loaiNhanVien !== payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDsNhanVien,
  setDsNhanVienBanDau,
  setLocLoaiNhanVien,
  filterDsNhanVien,
} = staffSlice.actions;

export default staffSlice.reducer;
