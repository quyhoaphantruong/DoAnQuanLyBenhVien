import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const precriptionDebtsMockData = [
  {
    idThongTinThanhToan: 24888,
    tongTienThanhToan: 96,
    ngayTao: "1953-02-24",
    tenBacSi: "NhanVien 3",
  },
  {
    idThongTinThanhToan: 14555,
    tongTienThanhToan: 3,
    ngayTao: "1984-08-23",
    tenBacSi: "NhanVien 2",
  },
  {
    idThongTinThanhToan: 2540,
    tongTienThanhToan: 95,
    ngayTao: "1973-03-12",
    tenBacSi: "NhanVien 2",
  },
  {
    idThongTinThanhToan: 69610,
    tongTienThanhToan: 28,
    ngayTao: "1997-10-05",
    tenBacSi: "NhanVien 4",
  },
  {
    idThongTinThanhToan: 74856,
    tongTienThanhToan: 54,
    ngayTao: "2022-04-22",
    tenBacSi: "NhanVien 3",
  },
  {
    idThongTinThanhToan: 84187,
    tongTienThanhToan: 62,
    ngayTao: "1972-05-02",
    tenBacSi: "NhanVien 1",
  },
  {
    idThongTinThanhToan: 86782,
    tongTienThanhToan: 48,
    ngayTao: "1980-11-22",
    tenBacSi: "NhanVien 4",
  },
  {
    idThongTinThanhToan: 94052,
    tongTienThanhToan: 16,
    ngayTao: "1996-08-21",
    tenBacSi: "NhanVien 2",
  },
  {
    idThongTinThanhToan: 96677,
    tongTienThanhToan: 69,
    ngayTao: "1980-05-24",
    tenBacSi: "NhanVien 8",
  },
];
const PrescriptionDebt = ({ prescriptionDebts }) => {
  const navigate = useNavigate();
  const handlePayDebt = (idThongTinThanhToan, tongTienThanhToan) => {
    console.log("pay the debt", idThongTinThanhToan);
    navigate(`/complete-payment-debt-prescription/${idThongTinThanhToan}`, {
      state: {
        tongTienThanhToan,
      },
    });
  };

  return (
    <div>
      {prescriptionDebts?.map((debt) => (
        <Card key={debt.idThongTinThanhToan} sx={{ marginBottom: 5 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h2">
              Debt #{debt.idThongTinThanhToan}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Tiền nợ: {debt.tongTienThanhToan}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Ngày kê thuốc: {debt.ngayTao}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Tên bác sĩ: {debt.tenBacSi}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "auto", marginTop: 3 }}
            onClick={() =>
              handlePayDebt(debt.idThongTinThanhToan, debt.tongTienThanhToan)
            }
          >
            Thanh toán
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default PrescriptionDebt;
