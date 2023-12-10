import AxiosInstance from "../../configs/AxiosInstance";

class CalendarWorkingService {
  taoLichLamViec = async (lichLamViecInfo) => {
    try {
      const response = await AxiosInstance.post(
        "/working-calendar",
        lichLamViecInfo
      );

      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new CalendarWorkingService();
