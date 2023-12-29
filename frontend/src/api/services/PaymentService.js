import AxiosInstance from "../../configs/AxiosInstance";

class PaymentService {
  xemThanhToanChuaTra = async (patientId) => {
    try {
      const response = await AxiosInstance.get(
        `/payments/patient/${patientId}/paid-yet`
      );

      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new PaymentService();
