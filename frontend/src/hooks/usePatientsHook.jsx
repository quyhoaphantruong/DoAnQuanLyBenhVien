import { useEffect } from "react";
import PatientService from "../api/services/PatientService";
import { useState } from "react";

function usePatientsHook() {
  const [dsNhanVienBanDau, setDsNhanVienBanDau] = useState([]);
  const [dsBenhNhan, setDsBenhNhan] = useState([]);
  const [locLoaiNhanVien, setLocLoaiNhanVien] = useState("All");
  useEffect(() => {
    const dsNhanVien = async () => {
      try {
        const res = await PatientService.xemDanhSachBenhNhan();
        if (res?.status == 200) {
          setDsBenhNhan(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    dsNhanVien();
  }, []);

  useEffect(() => {
    if (locLoaiNhanVien === "All") {
      setDsBenhNhan(dsNhanVienBanDau);
      return;
    }
    const newDsNhanVien = [];
    for (const nhanVien of dsNhanVienBanDau) {
      if (nhanVien?.loaiNhanVien === locLoaiNhanVien)
        newDsNhanVien.push(nhanVien);
    }
    setDsBenhNhan(newDsNhanVien);
  }, [locLoaiNhanVien]);
  return {
    dsNhanVienBanDau,
    dsBenhNhan,
    locLoaiNhanVien,
    setLocLoaiNhanVien,
  };
}

export default usePatientsHook;
