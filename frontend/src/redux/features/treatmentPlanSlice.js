import { createSlice } from "@reduxjs/toolkit";

// selectedTooth: object Rang
// selectedFacialType: object Mat
export const initialState = {
  keHoachDieuTri: {
    idBenhNhan: null,
    chanDoan: "",
    noiDung: "",
  },
  selectedTeethAndFacialTypes: [],
  selectedTooth: null,
  selectedFacialType: null,
  selectedTreatment: null,
};

export const treatmentPlanSlice = createSlice({
  name: "treatment-plan",
  initialState,
  reducers: {
    setKeHoachDieuTri: (state, { payload }) => {
      state.keHoachDieuTri = payload;
    },
    addSelectedToothAndFacialType: (state, { payload }) => {
      state.selectedTeethAndFacialTypes.push(payload);
      console.log(state.selectedTeethAndFacialTypes);
    },
    setSelectedTooth: (state, { payload }) => {
      state.selectedTooth = payload;
    },
    setSelectedFacialType: (state, { payload }) => {
      state.selectedFacialType = payload;
    },
    setSelectedTreatment: (state, { payload }) => {
      state.selectedTreatment = payload;
    },
    removeSelectedToothAndFacialtype: (state, { payload }) => {
      console.log("remove", payload);
      state.selectedTeethAndFacialTypes =
        state.selectedTeethAndFacialTypes.filter((item) => {
          return !(
            item.idRang === payload.idRang && item.loaiMat === payload.loaiMat
          );
        });
    },
    resetTreatmentPlan: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setKeHoachDieuTri,
  addSelectedToothAndFacialType,
  setSelectedTooth,
  setSelectedFacialType,
  removeSelectedToothAndFacialtype,
  setSelectedTreatment,
  resetTreatmentPlan,
} = treatmentPlanSlice.actions;

export default treatmentPlanSlice.reducer;
