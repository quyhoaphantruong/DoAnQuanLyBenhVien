import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TreatmentService from "../../api/services/TreatmentService";
import { Button, Card, CardContent, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {
  getDieuTriColor,
  getDieuTriStatusText,
} from "../../utilities/statusTreatment";

function TreatmentsPatientListPage() {
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { idBenhNhan } = useParams();

  useEffect(() => {
    const getTreatments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await TreatmentService.xemDsKeHoachDieuTri(idBenhNhan);
        if (res?.status === 200) {
          setTreatmentPlans(res.data);
        } else {
          setError("Failed to fetch treatment plans");
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    getTreatments();
  }, [idBenhNhan]);

  return (
    <div>
      {isLoading && (
        <Typography variant="body1">Loading treatment plans...</Typography>
      )}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <Typography variant="h4" mb={3}>
        Danh sách kế hoạch điều trị
      </Typography>
      {treatmentPlans?.map((plan, idx) => (
        <Card key={idx} sx={{ my: 3 }}>
          <CardContent>
            <Typography variant="body2">Chẩn đoán: {plan.chanDoan}</Typography>
            <Typography variant="body2">Nội dung: {plan.noiDung}</Typography>
            <Typography variant="body2">Ngày tạo: {plan.ngayTao}</Typography>
            <Typography variant="body2">
              Tình trang điều trị:{" "}
              <CircleIcon color={getDieuTriColor(plan.tinhTrangDieuTri)} />
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to={`/treatment-details/${plan.idKehoachDieuTri}`}
            >
              Xem Chi Tiết
            </Button>
          </CardContent>
        </Card>
      ))}

      {treatmentPlans.length === 0 && (
        <Typography variant="body1">Chưa có kế hoạch điều trị</Typography>
      )}
    </div>
  );
}

export default TreatmentsPatientListPage;
