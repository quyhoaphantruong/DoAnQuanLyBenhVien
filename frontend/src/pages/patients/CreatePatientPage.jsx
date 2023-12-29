import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Replace with your actual API call using the parameters
      const response = await fetch("/api/dang-ky", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
          name,
          gender,
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful registration (e.g., redirect to login page)
        console.log("Registered successfully!");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error registering, please try again later.");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Đăng ký tài khoản
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="phone-number"
            label="Số điện thoại"
            variant="outlined"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            fullWidth
            id="password"
            label="Mật khẩu"
            variant="outlined"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            id="name"
            label="Họ và tên"
            variant="outlined"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="gender-label">Giới tính</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="Nam">Nam</MenuItem>
              <MenuItem value="Nữ">Nữ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          <Button variant="contained" color="primary" type="submit">
            Đăng ký
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterPage;
