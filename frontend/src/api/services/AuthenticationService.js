import AxiosInstance from "../../configs/AxiosInstance";

class AuthenticationService {
  loginForPersonnel = async (personnel) => {
    try {
      const response = await AxiosInstance.post("/auth/login-personnel", {
        soDienThoai: personnel.soDienThoai,
        matKhau: personnel.matKhau,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new AuthenticationService();
