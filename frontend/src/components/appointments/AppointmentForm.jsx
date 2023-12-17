import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AppointmentService from "../../api/services/AppointmentService";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    idBenhNhan: 2,
    idNhaSi: 1,
    idTroKham: null,
    idPhongKham: 1,
    thoiGian: "2023-12-15T09:30",
    ghiChu: "",
    tinhTrang: "Mới",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AppointmentService.taoCuocHen(formData);
      if (res?.status == 200) {
        alert(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="ID Bệnh Nhân"
            name="idBenhNhan"
            value={formData.idBenhNhan}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="ID Nhà Sĩ"
            name="idNhaSi"
            value={formData.idNhaSi}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="ID Phòng Khám"
            name="idPhongKham"
            value={formData.idPhongKham}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Thời Gian"
            type="datetime-local"
            name="thoiGian"
            value={formData.thoiGian}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Ghi Chú"
            name="ghiChu"
            value={formData.ghiChu}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Tình Trạng</InputLabel>
            <Select
              label="Tình Trạng"
              name="tinhTrang"
              value={formData.tinhTrang}
              onChange={handleChange}
            >
              <MenuItem value="Mới">Mới</MenuItem>
              <MenuItem value="Tái khám">Tái khám</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Tạo cuộc hẹn
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AppointmentForm;
