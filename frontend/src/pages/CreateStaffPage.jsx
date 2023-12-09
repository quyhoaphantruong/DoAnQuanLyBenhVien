import { Box, TextField } from "@mui/material";
import React from "react";

function CreateStaffPage() {
  return (
    <div>
      <Box as="form">
        <TextField label={"Tên nhân viên"} />
        <TextField label={"Ngày sinh"} />
      </Box>
    </div>
  );
}

export default CreateStaffPage;
