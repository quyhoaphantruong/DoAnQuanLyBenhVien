import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import AppointmentService from "../../api/services/AppointmentService";

function ViewDentistAppointments() {
  const { idNhaSi } = useParams();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AppointmentService.xemCuocHenNhaSi(idNhaSi);
        if (res?.status === 200) setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    // Call the function to fetch data
    fetchData();
  }, [idNhaSi]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cuộc hẹn của nha sĩ {idNhaSi}
      </Typography>
      {appointments.length > 0 ? (
        <List>
          {appointments.map((appointment) => (
            <React.Fragment key={appointment.idCuocHen}>
              <ListItem>
                <ListItemText
                  primary={`ID phòng khám: ${appointment.idPhongKham}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`ID bệnh nhân: ${appointment.idPhongKham}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Thời gian bắt đầu: ${appointment.thoiGian}`}
                />
                <ListItemText
                  primary={`Tình trạng: ${appointment.tinhTrang}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Ghi chú: ${appointment.ghiChu}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1">Nha sĩ chưa có cuộc hẹn nào</Typography>
      )}
    </Container>
  );
}

export default ViewDentistAppointments;
