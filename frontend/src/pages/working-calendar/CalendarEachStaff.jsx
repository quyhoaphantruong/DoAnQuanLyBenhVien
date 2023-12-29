import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CalendarWorkingService from "../../api/services/CalendarWorkingService";
import { Box, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";

function CalendarEachStaff() {
  const { idNhanVien } = useParams();
  const [lichLamViec, setLichLamViec] = useState([]);
  useEffect(() => {
    const layLichLamViec = async () => {
      try {
        const res = await CalendarWorkingService.layLichLamViecNhanVien(
          idNhanVien
        );
        console.log(res);
        if (res?.status == 200) {
          setLichLamViec(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    layLichLamViec();
  }, [idNhanVien]);

  return (
    <div>
      <Typography variant="h4">
        Lịch làm việc của nhân viên {idNhanVien}
      </Typography>
      {lichLamViec?.map((lich, idx) => (
        <Box
          key={idx}
          sx={{
            marginTop: 3,
            display: "flex",
            gap: "20px",
          }}
        >
          <Paper sx={{ padding: 3 }}>
            Giờ bắt đầu: {dayjs(lich.gioBatDau).format("YYYY-MM-DD HH:mm:ss")}
          </Paper>
          <Paper sx={{ padding: 3 }}>
            Giờ kết thúc: {dayjs(lich.gioKetThuc).format("YYYY-MM-DD HH:mm:ss")}
          </Paper>
          <Paper sx={{ padding: 3 }}>
            Địa chỉ phòng khám: {lich.diaChiPhongKham}
          </Paper>
        </Box>
      ))}
    </div>
  );
}

export default CalendarEachStaff;
