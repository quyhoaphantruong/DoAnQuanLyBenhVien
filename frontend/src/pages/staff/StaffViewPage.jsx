import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import PersonnelService from "../../api/services/PersonnelService";
import { Button, MenuItem, Select } from "@mui/material";
import { nhanVienRoles } from "../../constants/StaffRoles";
import { useDispatch } from "react-redux";
import { setDsNhanVien } from "../../redux/features/staffSlice";
import useStaffHook from "../../hooks/useStaffHook";

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

export default function StaffViewPage() {
  const { dsNhanVien, locLoaiNhanVien, setLocLoaiNhanVien } = useStaffHook();
  return (
    <div>
      <Select
        value={locLoaiNhanVien}
        onChange={(e) => setLocLoaiNhanVien(e.target.value)}
      >
        <MenuItem value="All">Tất cả</MenuItem>
        {nhanVienRoles.map((role, idx) => (
          <MenuItem key={idx} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Tên</TableCell>
              <TableCell align="right">Ngày sinh</TableCell>
              <TableCell align="right">Địa chỉ</TableCell>
              <TableCell align="right">Số điện thoại</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Loại nhân viên</TableCell>
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
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.loaiNhanVien}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
