import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import PatientService from "../api/services/PatientService";
import usePatientsHook from "../hooks/usePatientsHook";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PatientsPage() {
  const { dsBenhNhan, sdt, setSdt } = usePatientsHook();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   const dsNhanVien = async () => {
  //     try {
  //       const res = await PatientService.xemDanhSachBenhNhan();
  //       if (res?.status == 200) {
  //         setDsBenhNhan(res.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   dsNhanVien();
  // }, []);
  // useEffect(() => {
  //   if (locLoaiNhanVien === "All") {
  //     setDsBenhNhan(dsNhanVienBanDau);
  //     return;
  //   }
  //   const newDsNhanVien = [];
  //   for (const nhanVien of dsNhanVienBanDau) {
  //     if (nhanVien?.loaiNhanVien === locLoaiNhanVien)
  //       newDsNhanVien.push(nhanVien);
  //   }
  //   setDsBenhNhan(newDsNhanVien);
  // }, [locLoaiNhanVien]);
  return (
    <div>
      <TextField
        label="Tìm bằng số điện thoại"
        variant="outlined"
        value={sdt}
        onChange={(e) => setSdt(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id bệnh nhân</TableCell>
              <TableCell align="left">Tên</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="left">Email</TableCell>
              {/* <TableCell align="left">Xem thêm</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {dsBenhNhan?.map((row) => (
              <TableRow
                key={row.idNhanVien}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row?.idBenhNhan}</TableCell>
                <TableCell align="left">{row?.ten}</TableCell>
                <TableCell align="left">{row?.soDienThoai}</TableCell>
                <TableCell align="left">{row?.email}</TableCell>
                {/* <TableCell align="left">
                  <Button onClick={handleOpen}>Xem thêm</Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component={"form"}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
