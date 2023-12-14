import AxiosInstance from "../../configs/AxiosInstance";

class PatientService {
  taoNhanVien = async (nhanVienInfo) => {
    try {
      const response = await AxiosInstance.post("/personnel", nhanVienInfo);
      console.log(nhanVienInfo);
      return response;
    } catch (error) {
      return error;
    }
  };

  xemDanhSachBenhNhan = async () => {
    try {
      const response = await AxiosInstance.get("/patients");
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new PatientService();
