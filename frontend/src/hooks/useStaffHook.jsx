import { useEffect, useState } from "react";
import {
  setDsNhanVien,
  setDsNhanVienBanDau,
} from "../redux/features/staffSlice";
import PersonnelService from "../api/services/PersonnelService";
import { useDispatch, useSelector } from "react-redux";

function useStaffHook() {
  const { dsNhanVien, dsNhanVienBanDau } = useSelector((state) => state.staff);
  const [locLoaiNhanVien, setLocLoaiNhanVien] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    const dsNhanVien = async () => {
      try {
        const res = await PersonnelService.xemDanhSachNhanVien();
        console.log(res.data);
        if (res?.status == 200) {
          dispatch(setDsNhanVien(res.data));
          dispatch(setDsNhanVienBanDau(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    dsNhanVien();
  }, []);
  useEffect(() => {
    if (locLoaiNhanVien === "All") {
      dispatch(setDsNhanVien(dsNhanVienBanDau));
      return;
    }
    const newDsNhanVien = [];
    for (const nhanVien of dsNhanVienBanDau) {
      if (nhanVien?.loaiNhanVien === locLoaiNhanVien)
        newDsNhanVien.push(nhanVien);
    }
    dispatch(setDsNhanVien(newDsNhanVien));
  }, [locLoaiNhanVien]);
  return {
    dsNhanVien,
    dsNhanVienBanDau,
    locLoaiNhanVien,
    setLocLoaiNhanVien,
  };
}

export default useStaffHook;
