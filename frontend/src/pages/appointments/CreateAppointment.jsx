import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AppointmentForm from "../../components/appointments/AppointmentForm";
import FindFreeDentist from "./FindFreeDentist";

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

  const taoNhanVien = async () => {
    console.log(cuocHen);
  };

  return (
    <div>
      <Typography variant="h3">Tạo cuộc hẹn</Typography>
      {/* Tìm nha sĩ rảnh */}
      <FindFreeDentist />
      {/* Tạo cuộc hẹn */}
      <AppointmentForm handleSubmit={taoNhanVien} />
    </div>
  );
}

export default CreateAppointment;
