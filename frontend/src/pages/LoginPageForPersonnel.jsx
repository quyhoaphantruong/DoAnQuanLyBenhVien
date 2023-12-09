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
import { setUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

// Trang login cho nhân viên, ko dành cho bệnh nhân
function LoginPageForPersonnel() {
  const [personnel, setPersonnel] = useState({
    soDienThoai: "",
    matKhau: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonnel({ ...personnel, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await AuthenticationService.loginForPersonnel({
        soDienThoai: personnel.soDienThoai,
        matKhau: personnel.matKhau,
      });
      if (res?.status == 200) {
        dispatch(setUser(res.data));
        navigate("/");
      }
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
          Đăng nhập
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="soDienThoai"
            label="Số Điện Thoại"
            name="soDienThoai"
            autoComplete="soDienThoai"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="matKhau"
            label="Mật Khẩu"
            type="password"
            id="matkhau"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPageForPersonnel;
