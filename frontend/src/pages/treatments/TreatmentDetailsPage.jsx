import { useEffect, useState } from "react";
import TreatmentService from "../../api/services/TreatmentService";
import { useParams } from "react-router-dom";
import { Typography, Box, Container, Grid, Paper } from "@mui/material";
const groupedByDate = (data) =>
  data.reduce((acc, obj) => {
    const { ngayTao, ...rest } = obj;
    acc[ngayTao] = acc[ngayTao] || [];
    acc[ngayTao].push(rest);
    return acc;
  }, {});

function TreatmentDetailsPage() {
  const { idKeHoachDieuTri } = useParams();
  const [dsChiTietDieuTri, setDsChiTietDieuTri] = useState([]);

  useEffect(() => {
    const getTreatmentDetails = async () => {
      try {
        const res = await TreatmentService.xemKeHoachDieuTriCuThe(
          idKeHoachDieuTri
        );
        if (res?.status === 200) {
          const treatmentsGroupedByDate = groupedByDate(res.data);
          setDsChiTietDieuTri(treatmentsGroupedByDate);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTreatmentDetails();
  }, []);

  return (
    <Container>
      {Object.keys(dsChiTietDieuTri).map((date, index) => (
        <Box key={index} mb={3}>
          <Typography variant="h5" gutterBottom>
            Date: {date}
          </Typography>
          <Grid container spacing={3}>
            {dsChiTietDieuTri[date].map((item, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Paper elevation={3}>
                  <Box p={2}>
                    <Typography variant="h6">{item.tenDieuTri}</Typography>
                    <Typography variant="subtitle1">{item.tenRang}</Typography>
                    <Typography variant="body2">{item.tenMat}</Typography>
                    <Typography variant="body2">Phí: {item.phi}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
}

export default TreatmentDetailsPage;
