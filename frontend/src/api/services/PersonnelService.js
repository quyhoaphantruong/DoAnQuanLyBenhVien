import AxiosInstance from "../../configs/AxiosInstance";

class PersonnelService {
  taoNhanVien = async (nhanVienInfo) => {
    try {
      const response = await AxiosInstance.post("/personnel", nhanVienInfo);
      console.log(nhanVienInfo);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new PersonnelService();
