import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useClinicsHook from "../../hooks/useClinicsHook";

function ViewClincsPage() {
  const { clinics } = useClinicsHook();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Id phòng khám</TableCell>
            <TableCell align="left">Địa chỉ</TableCell>
            <TableCell align="left">Số điện thoại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clinics?.map((row) => (
            <TableRow
              key={row.idNhanVien}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row?.idPhongKham}</TableCell>
              <TableCell align="left">{row?.diaChiPhongKham}</TableCell>
              <TableCell align="left">{row?.soDienThoai}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ViewClincsPage;
