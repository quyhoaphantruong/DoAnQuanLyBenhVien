import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import AuthenticationService from "../api/services/AuthenticationService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patientFields } from "../constants/PatientFields";

const initState = {
  soDienThoai: "",
  matKhau: "",
  email: "",
  ten: "",
  gioiTinh: "",
};

function SignupPage() {
  const [benhNhan, setBenhNhan] = useState(initState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBenhNhan({ ...benhNhan, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await AuthenticationService.dangKyBenhNhan(benhNhan);
      console.log(res);
      if (res?.status == 200) {
        alert(res.data);
      }
      setBenhNhan(initState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LocalHospitalIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký bệnh nhân
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {patientFields.map((field, idx) => (
            <TextField
              key={idx}
              margin="normal"
              required
              fullWidth
              id={field.name}
              label={field.label}
              name={field.name}
              autoComplete={field.name}
              autoFocus
              onChange={handleChange}
            />
          ))}

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Đăng ký
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;
