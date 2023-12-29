import { useEffect } from "react";
import PatientService from "../api/services/PatientService";
import { useState } from "react";

function usePatientsHook() {
  const [dsBenhNhanBanDau, setDsBenhNhanBanDau] = useState([]);
  const [dsBenhNhan, setDsBenhNhan] = useState([]);
  const [sdt, setSdt] = useState("");
  useEffect(() => {
    const dsBenhNhan = async () => {
      try {
        const res = await PatientService.xemDanhSachBenhNhan();
        if (res?.status == 200) {
          setDsBenhNhanBanDau(res.data);
          setDsBenhNhan(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    dsBenhNhan();
  }, []);

  useEffect(() => {
    if (sdt.trim() !== "") {
      let newDsBenhNhan = [];
      for (const benhNhan of dsBenhNhanBanDau) {
        if (benhNhan.soDienThoai.startsWith(sdt)) {
          newDsBenhNhan.push(benhNhan);
        }
      }
      setDsBenhNhan(newDsBenhNhan);
    }
  }, [sdt]);
  return {
    dsBenhNhanBanDau,
    dsBenhNhan,
    sdt,
    setSdt,
  };
}

export default usePatientsHook;
