import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function createData(
  idNhanVien,
  ten,
  ngaySinh,
  diaChi,
  soDienThoai,
  email,
  loaiNhanVien
) {
  return {
    idNhanVien,
    ten,
    ngaySinh,
    diaChi,
    soDienThoai,
    email,
    loaiNhanVien,
  };
}

const rows = [
  createData("NV001", "QUYHOA", "28-01-2003", "Q8", "123", "@MGIAL", "Nha sĩ"),
  createData("NV001", "QUYHOA", "28-01-2003", "Q8", "123", "@MGIAL", "Nha sĩ"),
  createData("NV001", "QUYHOA", "28-01-2003", "Q8", "123", "@MGIAL", "Nha sĩ"),
  createData("NV001", "QUYHOA", "28-01-2003", "Q8", "123", "@MGIAL", "Nha sĩ"),
];

function CalendarStaffPage() {
  const { dsNhanVien } = useSelector((state) => state.staff);

  console.log(dsNhanVien);
  return (
    <div>
      <Typography variant="h4">Danh sách nhân viên</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Tên</TableCell>
              <TableCell align="right">Loại nhân viên</TableCell>
              <TableCell align="right">Xem chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dsNhanVien?.map((row) => (
              <TableRow
                key={row.idNhanVien}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.idNhanVien}
                </TableCell>
                <TableCell align="right">{row?.ten}</TableCell>
                <TableCell align="right">{row?.loaiNhanVien}</TableCell>
                <TableCell align="right">
                  <Button
                    as={Link}
                    to={`/calendar-staff/${row?.idNhanVien}`}
                    variant="contained"
                  >
                    Xem lịch làm việc
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CalendarStaffPage;
