import { useEffect, useState } from "react";
import ClinicService from "../api/services/ClinicService";

function useClinicsHook() {
  const [clinics, setClinics] = useState([]);
  useEffect(() => {
    const getClinics = async () => {
      try {
        const res = await ClinicService.xemDanhSachPhongKham();
        if (res?.status === 200) {
          setClinics(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getClinics();
  }, []);
  return { clinics };
}

export default useClinicsHook;
