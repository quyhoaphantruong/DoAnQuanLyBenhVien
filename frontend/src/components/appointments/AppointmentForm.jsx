import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setIdBenhNhan } from "../../redux/features/patientSlice";

const AppointmentForm = () => {
  const { idBenhNhan } = useSelector((state) => state.patient);
  const { dentistSelected } = useSelector((state) => state.dentist);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    idBenhNhan,
    idNhaSi: dentistSelected?.idNhanVien || "",
    idTroKham: null,
    idPhongKham: 1,
    thoiGian: "2023-12-15T09:30",
    ghiChu: "",
    tinhTrang: "Mới",
  });
  useEffect(() => {
    if (dentistSelected)
      setFormData((prev) => ({
        ...prev,
        idNhaSi: dentistSelected.idNhanVien,
      }));
  }, [dentistSelected]);

  useEffect(() => {
    console.log("change appoint form", idBenhNhan);
    setFormData((prev) => ({
      ...prev,
      idBenhNhan,
    }));
  }, [idBenhNhan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "idBenhNhan") {
      dispatch(setIdBenhNhan(value));
      return;
    }
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
      <Grid container spacing={2} mt={3}>
        <Grid item xs={6}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Id bệnh nhân"
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
            value={formData?.idNhaSi}
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
