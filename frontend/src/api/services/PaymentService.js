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

  thanhToanKeHoachDieuTri = async (payload) => {
    try {
      const response = await AxiosInstance.post(
        "/payments/payment/treatment",
        payload
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  thanhToanDonThuoc = async (payload) => {
    try {
      const response = await AxiosInstance.post(
        "/payments/payment/prescription",
        payload
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  xemTongTienThanhToan = async (idThongTinThanhToan) => {
    try {
      const response = await AxiosInstance.get(
        `/payments/payment/total-sum/${idThongTinThanhToan}`
      );
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new PaymentService();
