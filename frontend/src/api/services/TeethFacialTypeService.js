import AxiosInstance from "../../configs/AxiosInstance";

class TeethFacialTypeService {
  xemDanhSachRang = async () => {
    try {
      const response = await AxiosInstance.get("/teeth-face/teeth");
      return response;
    } catch (error) {
      return error;
    }
  };
  xemDanhSachMat = async () => {
    try {
      const response = await AxiosInstance.get("/teeth-face/face");
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new TeethFacialTypeService();
