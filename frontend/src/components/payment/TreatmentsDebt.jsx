import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { formatToVND } from "../../utilities/formatPrice";
import { useNavigate } from "react-router-dom";
import PaymentService from "../../api/services/PaymentService";

const treatmentDebtsMockData = [
  {
    idThongTinThanhToan: 30001,
    tongTienThanhToan: 427,
    chanDoan: "",
    noiDung: "65934",
    ngayTao: "1958-10-24",
  },
  {
    idThongTinThanhToan: 50001,
    tongTienThanhToan: 106,
    chanDoan: "",
    noiDung: "65934",
    ngayTao: "1958-10-24",
  },
  {
    idThongTinThanhToan: 12001,
    tongTienThanhToan: 306,
    chanDoan: "FXS92J7DOJIS6DIKX0Z4KJTUZ5KI2G4BS6ZO8SFNSA8TSAJY4X",
    noiDung: "15575",
    ngayTao: "1990-11-18",
  },
  {
    idThongTinThanhToan: 32001,
    tongTienThanhToan: 240,
    chanDoan: "FXS92J7DOJIS6DIKX0Z4KJTUZ5KI2G4BS6ZO8SFNSA8TSAJY4X",
    noiDung: "15575",
    ngayTao: "1990-11-18",
  },
  {
    idThongTinThanhToan: 13001,
    tongTienThanhToan: 405,
    chanDoan:
      "B8LXDROVFZGMKBW6UAIWV0X0H6WXWFHPA9WLWG0V8XFF17IML3U5K4BAAKG6VRZ0IQBBEBAEAMNYKIY",
    noiDung: "59608",
    ngayTao: "2016-05-18",
  },
  {
    idThongTinThanhToan: 43001,
    tongTienThanhToan: 227,
    chanDoan:
      "B8LXDROVFZGMKBW6UAIWV0X0H6WXWFHPA9WLWG0V8XFF17IML3U5K4BAAKG6VRZ0IQBBEBAEAMNYKIY",
    noiDung: "59608",
    ngayTao: "2016-05-18",
  },
  {
    idThongTinThanhToan: 25001,
    tongTienThanhToan: 500,
    chanDoan: "H5KKAC2Z",
    noiDung: "55152",
    ngayTao: "1956-02-19",
  },
  {
    idThongTinThanhToan: 56001,
    tongTienThanhToan: 246,
    chanDoan: "KL9YMT3BX9G4UBG1INYJSQIBTVR3BR",
    noiDung: "35267",
    ngayTao: "2011-04-04",
  },
  {
    idThongTinThanhToan: 67001,
    tongTienThanhToan: 136,
    chanDoan: "9Q72W2042KTK49R3ILIBGYCGRM7VINVLJ4Y2J0",
    noiDung: "31765",
    ngayTao: "1990-02-20",
  },
  {
    idThongTinThanhToan: 18001,
    tongTienThanhToan: 173,
    chanDoan:
      "DWTADSG8QWMEJVGS6S2DNUH1QIDKLUL92UGTWBQ9Y70906NXRFKNYMJIFSKVEWNVADBOEMVV1SFGU70",
    noiDung: "33347",
    ngayTao: "2018-03-18",
  },
  {
    idThongTinThanhToan: 28001,
    tongTienThanhToan: 430,
    chanDoan:
      "DWTADSG8QWMEJVGS6S2DNUH1QIDKLUL92UGTWBQ9Y70906NXRFKNYMJIFSKVEWNVADBOEMVV1SFGU70",
    noiDung: "33347",
    ngayTao: "2018-03-18",
  },
];

const TreatmentsDebt = ({ debtData }) => {
  // const [debtData, setDebtData] = useState(treatmentDebtsMockData);
  const navigate = useNavigate();
  const handlePayDebt = (debt) => {
    navigate(`/complete-payment-debt/${debt.idThongTinThanhToan}`, {
      state: {
        idThongTinThanhToan: debt.idThongTinThanhToan,
        tongTienThanhToan: debt.tongTienThanhToan,
      },
    });
  };

  return (
    <div>
      {debtData?.map((debt) => (
        <Card sx={{ marginBottom: 5 }} key={debt.idThongTinThanhToan}>
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
              Tiền nợ: {formatToVND(debt.tongTienThanhToan)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Nội dung: {debt.noiDung}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Chẩn đoán: {debt.chanDoan}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {debt.ngayTao}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "auto", marginTop: 2 }}
            onClick={() => handlePayDebt(debt)}
          >
            Thanh toán
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default TreatmentsDebt;
