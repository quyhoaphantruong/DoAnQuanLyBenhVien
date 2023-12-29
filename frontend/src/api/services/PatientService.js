import AxiosInstance from "../../configs/AxiosInstance";

class PatientService {
  dangKyBenhNhan = async (benhNhanInfo) => {
    try {
      const response = await AxiosInstance.post("/dang-ky", benhNhanInfo);
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
