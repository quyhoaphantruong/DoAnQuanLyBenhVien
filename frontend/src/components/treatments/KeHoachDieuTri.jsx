import { TextField, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setKeHoachDieuTri } from "../../redux/features/treatmentPlanSlice";

const KeHoachDieuTri = () => {
  const { keHoachDieuTri } = useSelector((state) => state.treatmentPlan);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newKeHoachDieuTri = {
      ...keHoachDieuTri,
      [name]: value,
    };
    dispatch(setKeHoachDieuTri(newKeHoachDieuTri));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Tạo kế hoạch điều trị</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          name="chanDoan"
          label="Chẩn đoán"
          value={keHoachDieuTri.chanDoan}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          name="noiDung"
          label="Nội dung"
          value={keHoachDieuTri.noiDung}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          name="idBenhNhan"
          label="ID Bệnh nhân"
          value={keHoachDieuTri.idBenhNhan}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default KeHoachDieuTri;
