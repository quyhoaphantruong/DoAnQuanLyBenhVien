import { Button, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { formatTeethAndFacialTypesToString } from "../../utilities/formatTeethAndFacial";
import { useState } from "react";
import TreatmentService from "../../api/services/TreatmentService";
import { resetTreatmentPlan } from "../../redux/features/treatmentPlanSlice";

function ReviewInformation() {
  const [reviewOpen, setReviewOpen] = useState(false);

  const { keHoachDieuTri, selectedTreatment, selectedTeethAndFacialTypes } =
    useSelector((state) => state.treatmentPlan);
  const dispatch = useDispatch();
  const toggleReviewOpen = () => {
    setReviewOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    console.log("submit");
    console.log({
      keHoachDieuTri,
      selectedTeethAndFacialTypes,
      selectedTreatment,
    });

    try {
      const keHoachDieuTriRes = await TreatmentService.taoKeHoachDieuTri(
        keHoachDieuTri
      );
      if (keHoachDieuTriRes?.status == 200) {
        // Process the payload for themChiTietDieuTri
        let payloadForChiTietDieuTri = [];
        const idDieuTri = selectedTreatment.idDieuTri;
        for (const teethAndFacialType of selectedTeethAndFacialTypes) {
          payloadForChiTietDieuTri.push({
            idKeHoachDieuTri: keHoachDieuTriRes.data,
            idDieuTri,
            idRang: teethAndFacialType.idRang,
            loaiMat: teethAndFacialType.loaiMat,
          });
        }
        const chiTietDieuTriRes = await TreatmentService.taoChiTietDieuTri(
          payloadForChiTietDieuTri
        );
        console.log("chitietdieutrires", chiTietDieuTriRes);
        if (chiTietDieuTriRes?.status == 200) {
          alert(chiTietDieuTriRes.data);
          dispatch(resetTreatmentPlan());
        } else {
          alert("ko thêm được");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Grid item xs={12} mt={3}>
        <Button variant="contained" color="primary" onClick={toggleReviewOpen}>
          Xem lại thông tin
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Paper
          elevation={3}
          style={{ padding: "20px", display: reviewOpen ? "block" : "none" }}
        >
          <Typography variant="h6">Xem lại thông tin</Typography>
          <Typography variant="subtitle1">
            Chẩn đoán: {keHoachDieuTri?.chanDoan}
          </Typography>
          <Typography variant="subtitle1">
            Nội dung: {keHoachDieuTri?.noiDung}
          </Typography>
          <Typography variant="subtitle1">
            Điều trị: {selectedTreatment?.tenDieuTri}
          </Typography>
          <Typography variant="subtitle1">
            Danh sách răng và mặt chọn:{" "}
            {formatTeethAndFacialTypesToString(selectedTeethAndFacialTypes)}
          </Typography>

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Tạo kế hoạch điều trị
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}

export default ReviewInformation;
