//Khách Hàng
import "../styles/AppointmentsPage.css"
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIYVtpR2Nbe055flFBallQVAciSV9jS31SdEVqWXZad3FXRWRUVA==');
import {
    Box,
    Button,
    FormGroup,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import PersonnelService from "../api/services/PersonnelService";



function CreateMedPage() {
    const [selects_Phong, setSelects_Phong] = useState()
    const [PhongList, SetPhongList] = useState([
        'B1',
        'B2',
        'B3',
    ]);

    const [selects_PhongKham, setSelects_PhongKham] = useState()
    const [PhongKhamList, SetPhongKhamList] = useState([
        'Phong Kham 1',
        'Phong Kham 2',
        'Phong Kham 3',
    ]);

    const [selects_State, setSelects_State] = useState()
    const [StateList, SetStateList] = useState([
        'Cuộc hẹn mới',
        'Tái khám',
    ]);
    const [GhiChu, setGhiChu] = useState("")
    const [DateTime, setDateTime] = useState(new Date())


    const [selects_BacSi, setSelects_BacSi] = useState()
    const [BacSiList, setBacSi] = useState([
        'Bác sĩ 1',
        'Bác sĩ 2',
        'Bác sĩ 3',
    ]);

    const [selects_TroKham, setSelects_TroKham] = useState()
    const [TroKhamList, setTroKham] = useState([
        'Trợ khám 1',
        'Trợ khám 2',
        'Trợ khám 3',
    ]);
    console.log(selects_BacSi);
    return (
        <div>
            <Typography variant="h3">Thêm lịch hẹn</Typography>
            <Box as="form">

                <TextField label="Nhập ghi chú" className="GhiChu" value={GhiChu}
                    onChange={(e) => setGhiChu(e.target.value)} />

                <div className="NgayGio">
                    <DateTimePickerComponent value={DateTime}
                        onChange={(e) => setDateTime(e.target.value)}>
                    </DateTimePickerComponent>
                </div>
                <div className="SelectGroup">
                    <Select value={selects_BacSi} onChange={(e) => setSelects_BacSi(e.target.value)} placeholder="Chọn Bác Sĩ">
                        {BacSiList.map((BacSi, index) => (
                            <MenuItem value={BacSi}>{BacSi}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="SelectGroup">
                    <Select value={selects_TroKham} onChange={(e) => setSelects_TroKham(e.target.value)}>
                        {TroKhamList.map((TroKham, index) => (
                            <MenuItem value={TroKham}>{TroKham}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="SelectGroup">
                    <Select value={selects_State} onChange={(e) => setSelects_State(e.target.value)}>

                        {StateList.map((Loai, index) => (
                            <MenuItem value={Loai}>{Loai}</MenuItem>
                        ))}
                    </Select>

                </div>

                <div className="SelectGroup">
                    <Select value={selects_PhongKham} onChange={(e) => setSelects_PhongKham(e.target.value)}>

                        {PhongKhamList.map((PhongKham, index) => (
                            <MenuItem value={PhongKham}>{PhongKham}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="SelectGroup">
                    <Select value={selects_Phong} onChange={(e) => setSelects_Phong(e.target.value)} >

                        {PhongList.map((Phong, index) => (
                            <MenuItem value={Phong}>{Phong}</MenuItem>
                        ))}
                    </Select>
                </div>

                <Button variant="contained">
                    Thêm cuộc hẹn
                </Button>




            </Box>
        </div>)

}

export default CreateMedPage;
