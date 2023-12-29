import AxiosInstance from "../../configs/AxiosInstance";

class ClinicService {
  xemDanhSachPhongKham = async () => {
    try {
      const response = await AxiosInstance.get("/clinics");
      return response;
    } catch (error) {
      return error;
    }
  };

  xemThuocTonPhongKham = async (idPhongKham) => {
    try {
      const response = await AxiosInstance.get(`/clinics/${idPhongKham}/drug`);
      return response;
    } catch (error) {
      return error;
    }
  };

  capNhatQuanLyThuoc = async (payload) => {
    try {
      const response = await AxiosInstance.put("/clinics/drug", payload);
      return response;
    } catch (error) {
      return error;
    }
  };

  themThuocQuanLy = async (payload) => {
    try {
      const response = await AxiosInstance.post("/clinics/drug", payload);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new ClinicService();
