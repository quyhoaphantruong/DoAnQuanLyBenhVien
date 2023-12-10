import {
  Box,
  Button,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PersonnelService from "../api/services/PersonnelService";

const fields = [
  {
    label: "Tên nhân viên",
    type: "text",
    key: "ten",
  },
  {
    label: "Ngày sinh",
    type: "date",
    key: "ngaySinh",
  },
  {
    label: "Email",
    type: "text",
    key: "email",
  },
  {
    label: "Số điện thoại",
    type: "text",
    key: "soDienThoai",
  },
  {
    label: "Địa chỉ",
    type: "text",
    key: "diaChi",
  },
  {
    label: "Loại nhân viên",
    type: "select",
    key: "loaiNhanVien",
  },
];

function CreateStaffPage() {
  const [nhanVien, setNhanVien] = useState({
    ten: "",
    ngaySinh: "",
    diaChi: "",
    email: "",
    soDienThoai: "",
    loaiNhanVien: "Nha sĩ",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNhanVien({ ...nhanVien, [name]: value });
  };
  const taoNhanVien = async () => {
    console.log(nhanVien);
    try {
      const res = await PersonnelService.taoNhanVien(nhanVien);
      console.log("res", res);
      if (res?.status == 200) {
        alert("thêm nhân viên thành công");
      } else {
        if (res?.response?.data) alert(res.response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h3">Thêm nhân viên</Typography>
      <Box as="form">
        {fields.map((field, idx) =>
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
              <MenuItem value={"Trợ khám"}>Trợ khám</MenuItem>
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
        )}
      </Box>
      <Button variant="contained" onClick={taoNhanVien}>
        Tạo nhân viên
      </Button>
    </div>
  );
}

export default CreateStaffPage;
