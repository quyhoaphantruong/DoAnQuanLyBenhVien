import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import TeethFacialTypeService from "../../api/services/TeethFacialTypeService";
import TreatmentService from "../../api/services/TreatmentService";
import TeethAndFacialForm from "./TeethAndFacialForm";
import SelectedTeethAndFacialTypes from "./SelectedTeethAndFacialTypes";

const TeethAndFacialSelection = ({ selectedTreatment }) => {
  const [readyToAddToothAndFacialType, setReadyToAddToothAndFacialtype] =
    useState(false);
  const [selectedTeethIds, setSelectedTeethIds] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [teeth, setTeeth] = useState([]);
  const [facialTypes, setFacialTypes] = useState([]);
  const { keHoachDieuTri } = useSelector((state) => state.treatmentPlan);

  const { selectedTeethAndFacialTypes } = useSelector(
    (state) => state.treatmentPlan
  );
  console.log(selectedTeethAndFacialTypes);
  useEffect(() => {
    const getTeethAndFacialTypes = async () => {
      try {
        const rangResponse = await TeethFacialTypeService.xemDanhSachRang();
        const matResponse = await TeethFacialTypeService.xemDanhSachMat();
        if (rangResponse?.status === 200 && matResponse?.status === 200) {
          setTeeth(rangResponse.data);
          setFacialTypes(matResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTeethAndFacialTypes();
  }, []);

  const toggleReviewOpen = () => {
    setReviewOpen((prev) => !prev);
  };

  const formatTeethAndFacialTypesToString = (teethAndFacialTypes) => {
    let result = [];
    teethAndFacialTypes.forEach((item) => {
      result.push(`${item.tenRang}-${item.tenMat}`);
    });
    return result.join(", ");
  };

  const handleSubmit = async () => {
    try {
      const keHoachDieuTriRes = await TreatmentService.taoKeHoachDieuTri(
        keHoachDieuTri
      );
      if (keHoachDieuTriRes?.status == 200) {
        for (const selectedToothId of selectedTeethIds) {
          const chiTietDieuTriRes = await TreatmentService.taoChiTietDieuTri({
            idKeHoachDieuTri: keHoachDieuTriRes?.data,
            idRang: selectedToothId,
            idDieuTri: selectedTreatment.idDieuTri,
            loaiMat: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Treatments section */}
      <Grid item xs={12}>
        <Typography variant="h6">{selectedTreatment?.tenDieuTri}</Typography>
      </Grid>
      {/* Teeth and Facial Types */}
      <Grid item xs={12}>
        <Typography variant="subtitle1">Chọn răng và mặt</Typography>
        {selectedTeethAndFacialTypes && (
          <SelectedTeethAndFacialTypes
            selectedTeethAndFacialTypes={selectedTeethAndFacialTypes}
          />
        )}
        {readyToAddToothAndFacialType && (
          <TeethAndFacialForm teeth={teeth} facialTypes={facialTypes} />
        )}
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => setReadyToAddToothAndFacialtype((prev) => !prev)}
        >
          Thêm răng và mặt
        </Button>
      </Grid>
      {/* Review information  */}
      <Grid item xs={12}>
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
    </Grid>
  );
};

export default TeethAndFacialSelection;
