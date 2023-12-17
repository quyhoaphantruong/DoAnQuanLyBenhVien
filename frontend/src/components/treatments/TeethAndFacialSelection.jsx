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
} from "@mui/material";
import { useSelector } from "react-redux";
import TeethFacialTypeService from "../../api/services/TeethFacialTypeService";
import TreatmentService from "../../api/services/TreatmentService";

const TeethAndFacialSelection = ({ selectedTreatment }) => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectedFacialType, setSelectedFacialType] = useState("");
  const [selectedFacialId, setSelectedFacialId] = useState("");
  const [selectedTeethIds, setSelectedTeethIds] = useState([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [teeth, setTeeth] = useState([]);
  const [facialTypes, setFacialTypes] = useState([]);
  const { keHoachDieuTri } = useSelector((state) => state.treatmentPlan);

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
    console.log(reviewOpen);
  };

  const handleToothChange = (event, tooth) => {
    const { value } = event.target;
    if (event.target.checked) {
      setSelectedTeethIds([...selectedTeethIds, tooth.idRang]);
    } else {
      const newSelectedTeethIds = selectedTeethIds.filter(
        (oldTooth) => oldTooth.idRang !== tooth.idRang
      );
      setSelectedTeethIds(newSelectedTeethIds);
    }
    const currentIndex = selectedTeeth.indexOf(value);
    const newSelectedTeeth = [...selectedTeeth];

    if (currentIndex === -1) {
      newSelectedTeeth.push(value);
    } else {
      newSelectedTeeth.splice(currentIndex, 1);
    }

    setSelectedTeeth(newSelectedTeeth);
  };

  const handleFacialTypeChange = (event) => {
    setSelectedFacialType(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(
      "Selected Treatment:",
      selectedTreatment,
      "Selected Teeth Ids:",
      selectedTeethIds,
      "Selected Facial Type:",
      selectedFacialType
    );
    const payload = {
      idKeHoachDieuTri: 1,
      idDieuTri: selectedTreatment.idDieuTri,
      idRang: selectedTeethIds[0],
      loaiMat: selectedFacialType,
    };
    console.log(payload);
    try {
      const keHoachDieuTriRes = await TreatmentService.taoKeHoachDieuTri(
        keHoachDieuTri
      );
      if (keHoachDieuTriRes?.status == 200) {
        let count = 0;
        for (const selectedToothId of selectedTeethIds) {
          const chiTietDieuTriRes = await TreatmentService.taoChiTietDieuTri({
            idKeHoachDieuTri: keHoachDieuTriRes?.data,
            idRang: selectedToothId,
            idDieuTri: selectedTreatment.idDieuTri,
            loaiMat: selectedFacialType,
          });
          if (chiTietDieuTriRes?.status == 200) {
            count += 1;
          }
        }
        console.log(count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{selectedTreatment?.tenDieuTri}</Typography>
      </Grid>
      <Grid item xs={6}>
        <FormGroup>
          <Typography variant="subtitle1">Chọn răng</Typography>
          {teeth?.map((tooth) => (
            <FormControlLabel
              key={tooth.idRang}
              control={
                <Checkbox
                  checked={selectedTeeth.includes(tooth.tenRang)}
                  onChange={(event) => handleToothChange(event, tooth)}
                  value={tooth.tenRang}
                />
              }
              label={tooth.tenRang}
            />
          ))}
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Chọn loại mặt</InputLabel>
          <Select
            value={selectedFacialType}
            onChange={(event) => handleFacialTypeChange(event)}
          >
            {facialTypes?.map((facialType) => (
              <MenuItem
                key={facialType}
                value={facialType?.loaiMat}
                onClick={() => setSelectedFacialId(facialType.loaiMat)}
              >
                {facialType?.tenMat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
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
            Răng chọn: {selectedTeeth.join(", ")}
          </Typography>
          <Typography variant="subtitle1">
            Loại mặt chọn: {selectedFacialType}
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
