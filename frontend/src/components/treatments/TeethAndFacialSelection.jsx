import React, { useState } from "react";
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

const TeethAndFacialSelection = ({ selectedTreatment }) => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectedFacialType, setSelectedFacialType] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const { keHoachDieuTri } = useSelector((state) => state.treatmentPlan);

  const toggleReviewOpen = () => {
    setReviewOpen((prev) => !prev);
    console.log(reviewOpen);
  };

  const handleToothChange = (event) => {
    const { value } = event.target;
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
      "Selected Teeth:",
      selectedTeeth,
      "Selected Facial Type:",
      selectedFacialType
    );
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{selectedTreatment?.name}</Typography>
      </Grid>
      <Grid item xs={6}>
        <FormGroup>
          <Typography variant="subtitle1">Select Teeth</Typography>
          {["Tooth 1", "Tooth 2", "Tooth 3"].map((tooth) => (
            <FormControlLabel
              key={tooth}
              control={
                <Checkbox
                  checked={selectedTeeth.includes(tooth)}
                  onChange={handleToothChange}
                  value={tooth}
                />
              }
              label={tooth}
            />
          ))}
        </FormGroup>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Select Facial Type</InputLabel>
          <Select value={selectedFacialType} onChange={handleFacialTypeChange}>
            {["Facial Type 1", "Facial Type 2", "Facial Type 3"].map(
              (facialType) => (
                <MenuItem key={facialType} value={facialType}>
                  {facialType}
                </MenuItem>
              )
            )}
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
