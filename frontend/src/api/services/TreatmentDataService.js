import AxiosInstance from "../../configs/AxiosInstance";

class TreatmentDataService {
  xemDanhSachDanhMucDieuTri = async () => {
    try {
      const response = await AxiosInstance.get(
        "/treatments/category-treatments"
      );

      return response;
    } catch (error) {
      return error;
    }
  };

  xemDanhSachDieuTri = async (danhMucDieuTriId) => {
    try {
      const response = await AxiosInstance.get(
        `/treatments/treatment-services/${danhMucDieuTriId}`
      );

      return response;
    } catch (error) {
      return error;
    }
  };

  taoKeHoachDieuTri = async () => {};
  taoChiTietDieuTri = async () => {};
}

export default new TreatmentDataService();
