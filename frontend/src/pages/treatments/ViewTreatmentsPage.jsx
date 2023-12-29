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
import { useNavigate } from "react-router-dom";
import usePatientsHook from "../../hooks/usePatientsHook";

function ViewTreatmentsPage() {
  const navigate = useNavigate();
  const { dsBenhNhan } = usePatientsHook();
  const viewTreatmentDetails = (benhNhan) => {
    navigate(`/treatments/${benhNhan.idBenhNhan}`);
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id bệnh nhân</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="left">Xem thêm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dsBenhNhan?.map((row) => (
              <TableRow
                key={row.idBenhNhan}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row?.idBenhNhan}</TableCell>
                <TableCell align="left">{row?.ten}</TableCell>
                <TableCell align="left">{row?.soDienThoai}</TableCell>
                <TableCell align="left">
                  <Button onClick={() => viewTreatmentDetails(row)}>
                    Xem các kế hoạch điều trị
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

export default ViewTreatmentsPage;
