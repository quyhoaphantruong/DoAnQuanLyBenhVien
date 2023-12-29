import { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  ListItemButton,
} from "@mui/material";
import AppointmentService from "../../api/services/AppointmentService";
import { useDispatch, useSelector } from "react-redux";
import { setIdBenhNhan } from "../../redux/features/patientSlice";
import { setDentistSelected } from "../../redux/features/dentistSlice";

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

function FindFreeDentist() {
  const [openModal, setOpenModal] = useState(false);
  const [freeDentists, setFreeDentists] = useState([]);
  const [gioBatDau, setGioBatDau] = useState("");
  const { idBenhNhan } = useSelector((state) => state.patient);

  const dispatch = useDispatch();

  const handleFindFreeDentist = async () => {
    try {
      const payload = {
        idBenhNhan: idBenhNhan,
        gioBatDau: gioBatDau,
      };

      const response = await AppointmentService.timNhaSiRanh(payload);
      console.log(response);
      setFreeDentists(response.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching free dentists:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFreeDentists([]);
  };

  return (
    <div>
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        label="ID Bệnh Nhân"
        value={idBenhNhan}
        onChange={(e) => dispatch(setIdBenhNhan(e.target.value))}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Thời Gian Bắt Đầu"
        type="datetime-local"
        value={gioBatDau}
        onChange={(e) => setGioBatDau(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" onClick={handleFindFreeDentist}>
        Tìm nha sĩ rảnh
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <h2>Danh sách nha sĩ rảnh</h2>
          <List>
            {freeDentists?.map((dentist) => (
              <ListItem disablePadding key={dentist.idNhanVien}>
                <ListItemButton
                  disableGutters
                  onClick={() => {
                    handleCloseModal();
                    dispatch(setDentistSelected(dentist));
                  }}
                >
                  <ListItemText primary={`Tên: ${dentist.ten}`} />
                  <ListItemText
                    secondary={`Đã khám: ${dentist.daKham ? "Rồi" : "Chưa"}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button variant="contained" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default FindFreeDentist;
