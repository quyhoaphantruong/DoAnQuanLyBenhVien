import { IconButton, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { removeSelectedToothAndFacialtype } from "../../redux/features/treatmentPlanSlice";
function SelectedTeethAndFacialTypes({ selectedTeethAndFacialTypes }) {
  const dispatch = useDispatch();
  return selectedTeethAndFacialTypes.map((item) => (
    <Stack
      direction="row"
      spacing={3}
      alignItems={"center"}
      key={`${item.idRang}-${item.loaiMat}`}
    >
      <Typography>{item.tenRang}</Typography>
      <Typography>{item.tenMat}</Typography>
      <IconButton
        color="error"
        onClick={() => {
          dispatch(removeSelectedToothAndFacialtype(item));
        }}
      >
        <ClearIcon />
      </IconButton>
    </Stack>
  ));
}

export default SelectedTeethAndFacialTypes;
