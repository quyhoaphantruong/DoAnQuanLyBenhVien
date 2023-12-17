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
}

export default new TreatmentService();
