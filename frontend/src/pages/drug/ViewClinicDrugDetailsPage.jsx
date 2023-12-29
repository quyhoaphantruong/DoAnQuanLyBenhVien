import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClinicService from "../../api/services/ClinicService";
import { Box, Button, Paper, Typography } from "@mui/material";
import CreateDrugForClinicForm from "../../components/clinic/CreateDrugForClinicForm";

function ViewClinicDrugDetailsPage() {
  const { idPhongKham } = useParams();
  const [drugs, setDrugs] = useState([]);
  useEffect(() => {
    const getQuanLyThuoc = async () => {
      try {
        const res = await ClinicService.xemThuocTonPhongKham(idPhongKham);
        if (res?.status == 200) {
          setDrugs(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getQuanLyThuoc();
  }, []);

  const handleIncrease = (index) => {
    const updatedDrugs = [...drugs];
    updatedDrugs[index].soLuongTon++;
    setDrugs(updatedDrugs);
  };

  const handleDecrease = (index) => {
    const updatedDrugs = [...drugs];
    if (updatedDrugs[index].soLuongTon > 0) {
      updatedDrugs[index].soLuongTon--;
      setDrugs(updatedDrugs);
    }
  };

  const capNhatSoLuongTon = async (idThuoc, soLuongTon) => {
    try {
      const res = await ClinicService.capNhatQuanLyThuoc({
        idPhongKham: parseInt(idPhongKham),
        idThuoc,
        soLuongTon,
      });
      if (res?.status === 200) {
        console.log(res);
        alert(res.data);
      } else {
        alert("Lỗi hệ thống");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {drugs.map((drug, index) => (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
            key={index}
            style={{ marginBottom: "20px" }}
          >
            <Typography variant="h6">{drug.tenThuoc}</Typography>
            <Typography>Số lượng tồn: {drug.soLuongTon}</Typography>
            <Button
              variant="contained"
              onClick={() => handleDecrease(index)}
              disabled={drug.soLuongTon <= 0}
            >
              Giảm
            </Button>
            <Button variant="contained" onClick={() => handleIncrease(index)}>
              Tăng
            </Button>
          </Box>
          <Button
            size="small"
            variant="contained"
            onClick={() => capNhatSoLuongTon(drug.idThuoc, drug.soLuongTon)}
            disabled={drug.soLuongTon <= 0}
          >
            Cập nhật
          </Button>{" "}
        </>
      ))}
      <CreateDrugForClinicForm />
    </div>
  );
}

export default ViewClinicDrugDetailsPage;
