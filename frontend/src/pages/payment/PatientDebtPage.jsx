import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Tabs, Tab } from "@mui/material";
import PaymentService from "../../api/services/PaymentService";
import PrescriptionDebt from "../../components/payment/PrescriptionDebt";
import TreatmentsDebt from "../../components/payment/TreatmentsDebt";

function PatientDebtPage() {
  const [debtList, setDebtList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0); // Initial tab value
  const { patientId } = useParams();

  useEffect(() => {
    const getPaymentDebts = async () => {
      setLoading(true);
      try {
        const res = await PaymentService.xemThanhToanChuaTra(patientId);
        console.log("debt data", res);
        if (res?.status == 200) {
          setDebtList(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPaymentDebts();
  }, []);
  return (
    <div>
      PatientDebtPage {patientId}
      {loading && <CircularProgress />}
      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
        <Tab label="Điều trị chưa trả" value={0} />
        <Tab label="Đơn thuốc chưa trả" value={1} />
      </Tabs>
      {value === 0 && debtList && (
        <TreatmentsDebt debtData={debtList?.thanhToanDieuTriChuaTraDTOList} />
      )}
      {value === 1 && (
        <PrescriptionDebt
          prescriptionDebts={debtList?.thanhToanDonThuocChuaTraDTOList}
        />
      )}
    </div>
  );
}

export default PatientDebtPage;
