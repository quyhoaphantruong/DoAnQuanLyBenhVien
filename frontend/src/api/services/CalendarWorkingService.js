import AxiosInstance from "../../configs/AxiosInstance";

class CalendarWorkingService {
  taoLichLamViec = async (lichLamViecInfo) => {
    console.log(lichLamViecInfo);
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

  layLichLamViecNhanVien = async (idNhanVien) => {
    try {
      const response = await AxiosInstance.get(
        `working-calendar/personnel/${idNhanVien}`
      );
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new CalendarWorkingService();
