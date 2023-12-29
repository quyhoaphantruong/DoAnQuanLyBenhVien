import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import PaymentService from "../../api/services/PaymentService"; // Assuming your payment service

function CompletePaymentDebtPrescriptionPage() {
  const { debtId } = useParams();
  const { state } = useLocation();
  const [debtDetails, setDebtDetails] = useState({});
  const [tongTien, setTongTien] = useState(state.tongTienThanhToan);
  const [tienTra, setTienTra] = useState("");
  const [tienThoi, setTienThoi] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
  const [error, setError] = useState(null);
  const [ghiChu, setGhiChu] = useState("");

  useEffect(() => {
    if (tienTra > tongTien) {
      setTienThoi(tienTra - tongTien);
    } else {
      setTienThoi(0);
    }
  }, [tienTra]);

  const handlePayment = async () => {
    if (tienTra < tongTien) {
      alert("Chưa đủ tiền để trả");
      return;
    }
    const payload = {
      idThongTinThanhToan: parseInt(debtId),
      tienDaTra: tienTra,
      tienThoi,
      tongTienThanhToan: tongTien,
      loaiThanhToan: paymentMethod,
      ghiChu,
    };
    try {
      const response = await PaymentService.thanhToanDonThuoc(payload);
      console.log("Payment response:", response);
      if (response?.status == 200) {
        alert(response.data);
      }
      setError(null);
    } catch (error) {
      console.error("Error making payment:", error);
      setError(
        "Error completing payment. Please check your details and try again."
      );
    }
  };

  return (
    <Card>
      <CardContent>
        {error && <Typography color="error">{error}</Typography>}
        {/* Display debt details if available */}
        {debtDetails.id && (
          <>
            <Typography variant="h5" component="h2">
              Thông tin thanh toán
            </Typography>
            <Typography variant="body2">
              Id thông tin thanh toán: {debtDetails.id}
            </Typography>
            <Typography variant="body2">
              Tổng tiền cần thanh toán: {debtDetails.tongTienThanhToan}
            </Typography>
            <Typography variant="body2">
              Type: {debtDetails.loaiThanhToan}
            </Typography>
          </>
        )}

        {/* Payment form */}
        <Stack spacing={3}>
          <FormControl fullWidth>
            <TextField
              type="number"
              id="payment-amount"
              label="Tiền trả"
              value={tienTra}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTienTra(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="payment-amount"
              label="Tiền thối"
              type="number"
              value={tienThoi}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTienThoi(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="number"
              id="payment-amount"
              label="Tổng tiền cần trả"
              value={tongTien}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTongTien(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value={"Tiền mặt"}>Tiền mặt</MenuItem>
              <MenuItem value={"Online"}>Thanh toán online</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="payment-amount"
              label="Ghi chú"
              value={ghiChu}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setGhiChu(e.target.value)}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            disabled={!debtId}
          >
            Thanh toán
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CompletePaymentDebtPrescriptionPage;
