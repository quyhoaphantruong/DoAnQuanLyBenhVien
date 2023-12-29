import React, { useEffect } from "react";
import useStaffHook from "../../hooks/useStaffHook";
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
import { useDispatch } from "react-redux";
import { setLocLoaiNhanVien } from "../../redux/features/staffSlice";
import { useNavigate } from "react-router-dom";

function ViewAppointsment() {
  const { dsNhanVien } = useStaffHook();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setLocLoaiNhanVien("Nha sĩ"));
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Tên</TableCell>
            <TableCell align="right">Ngày sinh</TableCell>
            <TableCell align="right">Địa chỉ</TableCell>
            <TableCell align="right">Số điện thoại</TableCell>
            <TableCell align="right">Các cuộc hẹn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dsNhanVien?.map((row) => (
            <TableRow
              key={row.idNhanVien}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idNhanVien}
              </TableCell>
              <TableCell align="right">{row?.ten}</TableCell>
              <TableCell align="right">{row?.ngaySinh}</TableCell>
              <TableCell align="right">{row?.diaChi}</TableCell>
              <TableCell align="right">{row?.soDienThoai}</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => {
                    navigate(`/appointments/dentist/${row.idNhanVien}`);
                  }}
                >
                  Xem cuộc hẹn
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ViewAppointsment;
