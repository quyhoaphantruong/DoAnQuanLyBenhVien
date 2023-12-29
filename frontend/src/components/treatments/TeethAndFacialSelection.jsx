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

const TeethAndFacialSelection = () => {
  const [readyToAddToothAndFacialType, setReadyToAddToothAndFacialtype] =
    useState(false);
  const [selectedTeethIds, setSelectedTeethIds] = useState([]);
  const [teeth, setTeeth] = useState([]);
  const [facialTypes, setFacialTypes] = useState([]);
  const { keHoachDieuTri, selectedTreatment } = useSelector(
    (state) => state.treatmentPlan
  );

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
    </Grid>
  );
};

export default TeethAndFacialSelection;
