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
import usePatientsHook from "../../hooks/usePatientsHook";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBenhNhanSelected } from "../../redux/features/patientSlice";

function PaymentDebtPage() {
  const { dsBenhNhan } = usePatientsHook();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewPatientDebt = (patient) => {
    navigate(`/patient-debt/${patient.idBenhNhan}`);
    dispatch(setBenhNhanSelected(patient));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Xem thêm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dsBenhNhan?.map((row) => (
              <TableRow
                key={row.idBenhNhan}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row?.ten}</TableCell>
                <TableCell align="left">{row?.soDienThoai}</TableCell>
                <TableCell align="left">{row?.email}</TableCell>
                <TableCell align="left">
                  <Button onClick={() => viewPatientDebt(row)}>Xem nợ</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PaymentDebtPage;
