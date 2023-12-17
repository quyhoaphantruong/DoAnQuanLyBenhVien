import AxiosInstance from "../../configs/AxiosInstance";

class AppointmentService {
  timNhaSiRanh = async (payload) => {
    try {
      const response = await AxiosInstance.post(
        "/appointments/free/dentist",
        payload
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  taoCuocHen = async (cuochen) => {
    try {
      const response = await AxiosInstance.post("/appointments", cuochen);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new AppointmentService();
