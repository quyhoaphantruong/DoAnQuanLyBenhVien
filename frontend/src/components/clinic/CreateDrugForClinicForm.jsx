import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ClinicService from "../../api/services/ClinicService";

function CreateDrugForClinicForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    idPhongKham: "",
    idThuoc: "",
    soLuongTon: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // convert string number to integer
      const payload = {
        idPhongKham: parseInt(formData.idPhongKham, 10),
        idThuoc: parseInt(formData.idThuoc, 10),
        soLuongTon: parseInt(formData.soLuongTon, 10),
      };
      const res = await ClinicService.themThuocQuanLy(payload);
      if (res?.status == 200) {
        alert(res.data);
      } else {
        alert(res.response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      idPhongKham: "",
      idThuoc: "",
      soLuongTon: "",
    });
  };

  return (
    <div>
      <Button
        sx={{
          marginTop: 3,
        }}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Thêm thuốc quản lý
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm thuốc quản lý</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="ID Phòng khám"
                  variant="outlined"
                  name="idPhongKham"
                  value={formData.idPhongKham}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="ID thuốc"
                  variant="outlined"
                  name="idThuoc"
                  value={formData.idThuoc}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Số lượng tồn"
                  variant="outlined"
                  name="soLuongTon"
                  value={formData.soLuongTon}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Thêm thuốc quản lý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateDrugForClinicForm;
