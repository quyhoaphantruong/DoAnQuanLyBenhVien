import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const fields = [];

function CreateAppointment() {
  const [cuocHen, setCuocHen] = useState({
    idNhanVien: "",
    ten: "",
    ngaySinh: "",
    diaChi: "",
    email: "",
    soDienThoai: "",
    loaiNhanVien: "Quản trị viên",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCuocHen({ ...cuocHen, [name]: value });
  };
  const taoNhanVien = async () => {
    console.log(cuocHen);
  };

  return (
    <div>
      <Typography variant="h3">Tạo cuộc hẹn</Typography>
      <Box as="form">
        {/* {fields.map((field, idx) =>
          field.type === "select" ? (
            <Select
              key={idx}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name={field.key}
              value={nhanVien[field.key]}
              label={field.label}
              onChange={handleChange}
            >
              <MenuItem value={"Quản trị viên"}>Quản trị viên</MenuItem>
              <MenuItem value={"Nhân viên"}>Nhân viên</MenuItem>
              <MenuItem value={"Nha sĩ"}>Nha sĩ</MenuItem>
            </Select>
          ) : (
            <FormGroup
              key={idx}
              sx={{
                margin: "10px 0",
              }}
            >
              <TextField
                name={field.key}
                label={field.label}
                type={field.type}
                onChange={handleChange}
              />
            </FormGroup>
          )
        )} */}
      </Box>
      <Button variant="contained" onClick={taoNhanVien}>
        Tạo cuộc hẹn
      </Button>
    </div>
  );
}

export default CreateAppointment;