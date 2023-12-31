import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import { calendarFields } from "../../constants/CalendarFields";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CalendarWorkingService from "../../api/services/CalendarWorkingService";
import dayjs from "dayjs";

const initState = {
  idNhanVien: "",
  phongKham: "",
  gioBatDau: dayjs(),
  gioKetThuc: dayjs(),
};

function processDateTime(datetime) {
  let date = datetime.$d;
  let formattedDate = `${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
  return formattedDate;
}
function CreateCalendar() {
  const [calendar, setCalendar] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCalendar({ ...calendar, [name]: value });
  };

  const taoLichLamViec = async () => {
    try {
      const formattedCalendar = {
        idNhanVien: calendar.idNhanVien,
        phongKham: calendar.phongKham,
        gioBatDau: processDateTime(calendar.gioBatDau),
      };

      const res = await CalendarWorkingService.taoLichLamViec(
        formattedCalendar
      );
      if (res?.status == 200) {
        alert(res.data);
      } else {
        alert("error");
      }
      setCalendar(initState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h3">Tạo lịch làm việc</Typography>
      <Box as="form">
        {calendarFields.map((field, idx) =>
          field.type === "datetime" ? (
            <LocalizationProvider key={idx} dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label={field.label}
                  name={field.name}
                  value={calendar[field.name]}
                  onChange={(newValue) => {
                    setCalendar({
                      ...calendar,
                      [field.name]: newValue,
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          ) : (
            <FormGroup
              key={idx}
              sx={{
                margin: "10px 0",
              }}
            >
              <TextField
                name={field.name}
                label={field.label}
                type={field.type}
                value={calendar[field.name]}
                onChange={handleChange}
              />
            </FormGroup>
          )
        )}
      </Box>
      <Button variant="contained" onClick={taoLichLamViec}>
        Tạo lịch làm việc
      </Button>
    </div>
  );
}

export default CreateCalendar;
