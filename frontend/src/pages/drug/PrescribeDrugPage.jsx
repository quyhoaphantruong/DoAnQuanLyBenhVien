import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

function PrescribeDrugPage() {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [prescription, setPrescription] = useState({
    idBenhNhan: "",
    bacSiDieuTri: user.idNhanVien,
    ghiChu: "",
    idPhongKham: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Thêm đơn thuốc
        </Typography>
      </Grid>
      <TextField
        fullWidth
        name="bacSiDieuTri"
        label="Bác sĩ kê khai thuốc"
        disabled={true}
        value={prescription.bacSiDieuTri}
        onChange={handleChange}
      />

      <Grid
        item
        xs={6}
        sx={{
          "&.MuiGrid-item": {
            paddingLeft: 0,
          },
        }}
      >
        <TextField
          fullWidth
          name="idBenhNhan"
          label="ID Bệnh nhân"
          value={prescription.idBenhNhan}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} sx={{ padding: 0 }}>
        <TextField
          fullWidth
          name="idPhongKham"
          label="ID Phòng khám"
          value={prescription.idPhongKham}
          onChange={handleChange}
        />
      </Grid>
      <TextField
        sx={{ mt: 3 }}
        fullWidth
        name="ghiChu"
        label="Ghi chú"
        value={prescription.ghiChu}
        onChange={handleChange}
      />
      <Button
        sx={{
          mt: 3,
        }}
        variant="contained"
      >
        Thêm đơn thuốc
      </Button>
    </Grid>
  );
}

export default PrescribeDrugPage;
