import AxiosInstance from "../../configs/AxiosInstance";

class TreatmentService {
  taoKeHoachDieuTri = async (keHoachDieuTri) => {
    try {
      const response = await AxiosInstance.post("/treatments", keHoachDieuTri);
      return response;
    } catch (error) {
      return error;
    }
  };

  taoChiTietDieuTri = async (chiTietDieuTri) => {
    try {
      const response = await AxiosInstance.post(
        "/treatments/treatment-details",
        chiTietDieuTri
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  xemDsKeHoachDieuTri = async (idBenhNhan) => {
    try {
      const response = await AxiosInstance.get(
        `treatments/patient/${idBenhNhan}`
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  xemKeHoachDieuTriCuThe = async (idKeHoachDieuTri) => {
    try {
      const response = await AxiosInstance.get(
        `treatments/treatment-details/${idKeHoachDieuTri}`
      );
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new TreatmentService();
