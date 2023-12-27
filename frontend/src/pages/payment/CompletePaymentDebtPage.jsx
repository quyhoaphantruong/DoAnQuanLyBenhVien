import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import PaymentService from "../../api/services/PaymentService"; // Assuming your payment service

function CompletePaymentDebtPage() {
  const { debtId } = useParams();
  const [debtDetails, setDebtDetails] = useState({});
  const [tongTien, setTongTien] = useState(1000);
  const [tienTra, setTienTra] = useState("");
  const [tienThoi, setTienThoi] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {}, [debtId]);

  useEffect(() => {
    if (tienTra > tongTien) {
      setTienThoi(tienTra - tongTien);
    } else {
      setTienThoi(0);
    }
  }, [tienTra]);

  const handlePayment = async () => {
    try {
      // Call your payment service to process the payment
      const response = await PaymentService.payDebt(
        debtId,
        tongTien,
        paymentMethod
      );
      console.log("Payment response:", response);
      setError(null); // Clear any previous errors
      // Handle successful payment, e.g., navigate to confirmation page or display success message
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
            {/* Additional fields as needed */}
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
              value={"paymentAmount"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {}}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            disabled={!debtDetails.id}
          >
            Pay Debt
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CompletePaymentDebtPage;
